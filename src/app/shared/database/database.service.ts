import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  public allUrl = {
    registeredUser: 'assets/data/reg_user.json',
    yogas: 'assets/data/yogas.json',
  };
  constructor(private http: HttpClient) {}

  getDataFromHttp(url: string): Observable<any> {
    return this.http.get(url);
  }

  getAllDocuments<Type>(url: string): Promise<Type> {
    return this.getDataFromHttp(url)
      .toPromise()
      .then((res) => res);
  }

  getSingleDocument<Type>(
    list: Type[],
    property: string,
    compareData: string
  ): Type {
    return list.filter((element: any) => element[property] == compareData)[0];
  }
}
