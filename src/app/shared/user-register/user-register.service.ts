import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user/user.model';
import { DatabaseService } from '../database/database.service';

@Injectable({
  providedIn: 'root',
})
export class UserRegisterService {
  constructor(private db: DatabaseService) {}

  // fetch user
  private fetchUser() {
    return this.db.getDataFromHttp(this.db.allUrl.registeredUser);
  }
  // check user exist
  public checkTheUserExist(user: User): Promise<boolean | string> {
    return this.fetchUser()
      .toPromise()
      .then((res) => {
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }
}
