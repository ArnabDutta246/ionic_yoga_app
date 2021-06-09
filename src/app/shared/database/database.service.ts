import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  public allUrl = {
    registeredUser: 'asset/data/registered_user.json',
  };
  constructor() {}
}
