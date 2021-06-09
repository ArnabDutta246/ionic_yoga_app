import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { loginRegResponse, User } from 'src/app/models/user/user.model';
import { DatabaseService } from '../database/database.service';

@Injectable({
  providedIn: 'root',
})
export class UserRegisterService {
  constructor(private db: DatabaseService) {}

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
  checkLoginOrReg(res: User[], user: User, login: boolean) {
    let response: loginRegResponse = {
      isExist: true,
      credential: true,
    };

    let findMember = res.filter(
      (userFind) => userFind.email == user.email
    ) as User[];
    response = {
      isExist: findMember.length > 0 ? true : false,
      credential: login
        ? findMember.length > 0
          ? true
          : false
        : findMember.length > 0 && findMember[0].password == user.password
        ? true
        : false,
    };
    return response;
  }
}
