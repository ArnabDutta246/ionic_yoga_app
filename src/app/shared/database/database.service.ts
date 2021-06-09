import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  public allUrl = {
    registeredUser: 'assets/data/reg_user.json',
  };
  constructor(private http: HttpClient) {}

  getDataFromHttp(url: string) {
    return this.http.get(url);
  }
}
