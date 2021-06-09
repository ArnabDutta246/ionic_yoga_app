import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  session$ = new BehaviorSubject<any | undefined>(undefined);
  constructor() {}

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
  }
}
