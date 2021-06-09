import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root',
})
export class AuthguardService implements CanActivate, CanActivateChild {
  constructor(private session: SessionService, private router: Router) {}

  canActivate(): boolean {
    return this.session.authState.value;
  }
  canActivateChild(): boolean {
    return this.session.authState.value;
  }
}
