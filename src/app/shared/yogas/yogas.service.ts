import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Session } from 'src/app/models/session/session.model';
import { Yoga } from 'src/app/models/yoga/yoga.model';
import { getFromStorage, setAtStorage } from '../app-storage/app-storage';
import { CommonComponentService } from '../common-component/common-component.service';
import { DatabaseService } from '../database/database.service';
import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root',
})
export class YogasService {
  // all yogas observables
  allYogas = new BehaviorSubject<Yoga[]>([]);
  // constructor
  constructor(
    private db: DatabaseService,
    private common: CommonComponentService,
    private session: SessionService
  ) {}

  // get all default yoga
  public fetchAllYogas(): Promise<Yoga[]> {
    return getFromStorage('yogas')
      .then((res) => {
        if (res == null) {
          return [];
        } else {
          this.allYogas.next(res);
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
  public getDefaultYogas(): Promise<Yoga[]> {
    return this.db.getAllDocuments<Yoga[]>(this.db.allUrl.yogas);
  }

  // create yogas
  public createYoga(sessionData: Session, newYogaData: Yoga): Promise<boolean> {
    if (sessionData.yogas == null) {
      sessionData.yogas = [newYogaData];
    } else {
      sessionData.yogas.push(newYogaData);
    }
    return this.session.mergeSessionData(sessionData, 'yogas');
  }

  // update

  // delete
  public deleteYoga(yogaId: string): Promise<boolean> {
    let sessionData = this.session.peek() as Session;
    return;
  }
  // err handler
  public errHandler(err) {
    this.common.errorAlert([err], 'danger');
  }
}
