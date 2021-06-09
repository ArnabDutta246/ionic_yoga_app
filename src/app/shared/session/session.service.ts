import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { getFromStorage, removeFromStorage } from '../app-storage/app-storage';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  session$ = new BehaviorSubject<any | undefined>(undefined);
  authState = new BehaviorSubject<boolean>(false);
  constructor(private router: Router) {}

  // session set up
  sessionSetUp(): Promise<boolean> {
    return getFromStorage('user').then((res) => {
      // console.log('form storage user data', res);
      if (res !== null) {
        this.poke({ user: res });
        this.authState.next(true);
        return true;
      } else {
        return false;
      }
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
