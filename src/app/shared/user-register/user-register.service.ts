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
  private fetchUser(): Observable<any> {
    return this.db.getDataFromHttp(this.db.allUrl.registeredUser);
  }
  // check user exist
  public checkTheUserExist(
    user: User,
    login?: boolean
  ): Promise<loginRegResponse> {
    return this.fetchUser()
      .toPromise()
      .then((res: User[]) => {
        return this.checkLoginOrReg(res, user, login);
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }
  // return check response
  async checkLoginOrReg(res: User[], user: User, login: boolean) {
    let response: loginRegResponse = {
      isExist: true,
      credential: true,
    };

    let findMember = (await res.filter(
      (userFind) => userFind.email == user.email
    )) as User[];

    console.log('member we get', findMember);

    response = {
      isExist: findMember.length > 0 ? true : false,
      credential: !login
        ? findMember.length > 0
          ? true
          : false
        : findMember.length > 0 && findMember[0].password == user.password
        ? true
        : false,
    };
    if (response.isExist && response.credential) {
      this.session.poke({ user: findMember[0] });
      setAtStorage('user', findMember[0]);
      this.session.authState.next(true);
    }
    return response;
  }
}
