import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  public allUrl = {
    registeredUser: 'assets/data/registered_user.json',
  };
  constructor() {}
}
