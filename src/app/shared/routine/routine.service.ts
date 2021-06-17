import { Injectable } from '@angular/core';
import { YogaListRef } from 'src/app/models/routine/routine.modal';
import { Session } from 'src/app/models/session/session.model';
import { Yoga } from 'src/app/models/yoga/yoga.model';
import { DatabaseService } from '../database/database.service';
import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root',
})
export class RoutineService {
  // variables
  yogaListRef: YogaListRef = {
    createdYogas: [],
    defaultYogas: [],
    routine: {
      daily: [],
      sun: [],
      mon: [],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
      sat: [],
    },
  };
  // constructor
  constructor(private db: DatabaseService, private session: SessionService) {}

  // store
  public storeRoutine(sessionData: Session): Promise<boolean> {
    return this.session.mergeSessionData(sessionData, 'routine');
  }

  // merge the array
  private margeArr(arrOne, arrTwo): Yoga[] {
    let mergeerArr = [...arrOne, ...arrTwo];
    return mergeerArr;
  }
  // fetch
  public fetchTodaysRoutine(): void {
    // this.session.
  }
}
