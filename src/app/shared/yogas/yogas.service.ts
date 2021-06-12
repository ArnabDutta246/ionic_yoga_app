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
  // get sessionData
  getSessionData() {
    return this.session.peek();
  }
  // get single yoga
  public fetchSingleYoga(list: Yoga[], yoga: Yoga): Yoga {
    return this.db.getSingleDocument<Yoga>(list, 'id', yoga.id);
  }

  // get default yogas
  public getDefaultYogas(): Promise<Yoga[]> {
    return this.db.getAllDocuments<Yoga[]>(this.db.allUrl.yogas);
  }

  // create yogas
  public createYoga(newYogaData: Yoga): Promise<boolean> {
    let sessionData: Session = this.getSessionData();
    if (sessionData.yogas == null) {
      sessionData.yogas = [newYogaData];
    } else {
      sessionData.yogas.push(newYogaData);
    }
    return this.session.mergeSessionData(sessionData, 'yogas');
  }

  // update
  public updateYoga(updateYogaData: Yoga): Promise<boolean> {
    let sessionData: Session = this.getSessionData();
    let findYoga: Yoga = this.fetchSingleYoga(
      sessionData.yogas,
      updateYogaData
    );
    this.objectPopulate(findYoga, updateYogaData);
    return this.session.mergeSessionData(sessionData, 'yogas');
  }

  // object populated
  objectPopulate(findYoga: Yoga, updateYogaData: Yoga): Yoga {
    let keys = Object.keys(updateYogaData);
    keys.forEach((key) => {
      findYoga[key] = updateYogaData[key];
    });
    return findYoga;
  }

  // delete
  public deleteYoga(yogaId: string): Promise<boolean> {
    let sessionData = this.session.peek() as Session;
    return;
  }

  // mark as favourite
  markFavourite(yoga: Yoga): void {
    let sessionData: Session = this.getSessionData();
    if (sessionData.yogas !== null) {
      let findYoga: Yoga = this.fetchSingleYoga(sessionData.yogas, yoga);
      findYoga.isFavourite = !findYoga.isFavourite;
      this.session.mergeSessionData(sessionData, 'yogas');
    }
  }

  // err handler
  public errHandler(err) {
    this.common.errorAlert([err], 'danger');
  }
}
