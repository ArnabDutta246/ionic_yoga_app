import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Session } from 'src/app/models/session/session.model';
import {
  getFromStorage,
  removeFromStorage,
  setAtStorage,
} from '../app-storage/app-storage';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  session$ = new BehaviorSubject<Session | undefined>(undefined);
  sessionObs = this.session$.asObservable();
  authState = new BehaviorSubject<boolean>(false);
  constructor(private router: Router) {}

  // session set up
  // 1. user data
  // 2. user created yogas
  // 3. user routine
  async initSession(): Promise<boolean> {
    // user
    let user = await this.sessionQuery('user');
    if (user) {
      this.authState.next(true);
      await this.sessionQuery('routine');
      await this.sessionQuery('yogas');
      return true;
    } else {
      return false;
    }
  }
  // session query
  sessionQuery(tableName: string): Promise<boolean> {
    return getFromStorage(tableName).then((res) => {
      this.patch({ [tableName]: res });
      return res !== null ? true : false;
    });
  }

  // merge in session Observables and storage
  mergeSessionData(
    sessionData: Session,
    databaseTable: string
  ): Promise<boolean> {
    return setAtStorage(databaseTable, sessionData[databaseTable])
      .then((res) => {
        this.patch(sessionData);
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }

  watch() {
    return this.session$;
  }
  peek() {
    return this.session$.value;
  }
  patch(t) {
    const newSession = Object.assign({}, this.peek() ? this.peek() : {}, t);
    this.poke(newSession);
  }
  poke(t) {
    this.session$.next(t);
  }
  clear() {
    this.poke(undefined);
    removeFromStorage('user');
    this.authState.next(false);
    this.router.navigate(['/user-login']);
  }
}
