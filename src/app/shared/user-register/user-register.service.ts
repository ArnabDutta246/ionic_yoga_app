import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user/user.model';
import { DatabaseService } from '../database/database.service';

@Injectable({
  providedIn: 'root',
})
export class UserRegisterService {
  constructor(private http: HttpClient, private db: DatabaseService) {}

  // fetch user
  fetchUser() {
    return this.http.get(this.db.allUrl.registeredUser).subscribe((res) => {
      console.log(res);
    });
  }
  // check user exist
  checkTheUserExist(user: User) {}
}
