import { ClassField } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { loginRegResponse, User } from 'src/app/models/user/user.model';
import { setAtStorage } from '../app-storage/app-storage';
import { DatabaseService } from '../database/database.service';
import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root',
})
export class UserRegisterService {
  constructor(private db: DatabaseService, private session: SessionService) {}

  // fetch user
  private fetchUser(): Promise<User[]> {
    return this.db.getAllDocuments<User[]>(this.db.allUrl.registeredUser);
  }
  // check user exist
  public checkTheUserExist(
    user: User,
    login?: boolean
  ): Promise<loginRegResponse> {
    return this.fetchUser()
      .then((res: User[]) => {
        console.log('all users', res);
        return this.checkLoginOrReg(res, user, login);
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }
  // return check response
  private checkLoginOrReg(
    res: User[],
    user: User,
    login: boolean
  ): loginRegResponse {
    let response: loginRegResponse = {
      isExist: true,
      credential: true,
    };

    let findMember = this.db.getSingleDocument<User>(res, 'email', user.email);

    response = {
      isExist: typeof findMember !== 'undefined' ? true : false,
      credential: !login
        ? typeof findMember !== 'undefined'
          ? true
          : false
        : typeof findMember !== 'undefined' &&
          findMember.password == user.password
        ? true
        : false,
    };
    if (response.isExist && response.credential) {
      this.session.poke({ user: findMember });
      setAtStorage('user', findMember);
      this.session.authState.next(true);
    }
    return response;
  }
}
