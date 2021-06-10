import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Yoga } from 'src/app/models/yoga/yoga.model';
import { getFromStorage } from '../app-storage/app-storage';
import { CommonComponentService } from '../common-component/common-component.service';
import { DatabaseService } from '../database/database.service';

@Injectable({
  providedIn: 'root',
})
export class YogasService {
  constructor(
    private db: DatabaseService,
    private common: CommonComponentService
  ) {}

  // get all default yoga
  public fetchAllYogas(): Promise<Yoga[]> {
    return getFromStorage('yogas')
      .then((res) => {
        if (res == null) {
          return [];
        } else {
          return res;
        }
      })
      .catch((err) => {
        console.log(err);
        this.errHandler(err);
      });
  }
  // get single yoga
  public fetchSingleYoga(id: string): Promise<Yoga> {
    return this.fetchAllYogas().then((res: Yoga[]) =>
      this.db.getSingleDocument(res, 'id', id)
    );
  }
  // get default yogas
  public getDefaultYogas() {
    return this.db.getAllDocuments<Yoga[]>(this.db.allUrl.yogas);
  }
  // create yogas

  // update

  // delete

  // insert in storage

  // err handler
  public errHandler(err) {
    this.common.errorAlert([err], 'danger');
  }
}
