import { Component, OnInit } from '@angular/core';
import { KeyboardStyle } from '@capacitor/core';
import { Routine, YogaListRef } from 'src/app/models/routine/routine.modal';
import { Session } from 'src/app/models/session/session.model';
import { Yoga } from 'src/app/models/yoga/yoga.model';
import { RoutineService } from 'src/app/shared/routine/routine.service';

import { SessionService } from 'src/app/shared/session/session.service';
import { YogasService } from 'src/app/shared/yogas/yogas.service';

@Component({
  selector: 'app-create-routine',
  templateUrl: './create-routine.page.html',
  styleUrls: ['./create-routine.page.scss'],
})
export class CreateRoutinePage implements OnInit {
  // variables
  sessionData: Session;
  passRefObject: YogaListRef;
  sessionDataCopyRef: Session | {} = {};
  // constructor
  constructor(
    private session: SessionService,
    private yogaService: YogasService,
    private routineService: RoutineService
  ) {
    this.passRefObject = this.routineService.yogaListRef;
  }
  // init
  ngOnInit() {}
  // get session data
  private getSessionData(): void {
    this.session.watch().subscribe(async (res) => {
      this.sessionData = res;
      // copy
      Object.assign(this.sessionDataCopyRef, this.sessionData);
      await this.fetchAllYogas();
      this.passRefObject.createdYogas =
        this.sessionData.yogas != null ? this.sessionData.yogas : [];
      await this.populateRefObj();
      // console.log(this.sessionData);
      // console.log(this.sessionDataCopyRef);
    });
  }
  // iondidload
  ionViewDidEnter() {
    this.getSessionData();
  }
  // fetch All yogas [ default + created ]
  private async fetchAllYogas(): Promise<void> {
    await this.yogaService.getDefaultYogas().then((res) => {
      if (res) this.passRefObject.defaultYogas = res;

      //console.log('default...', res);
    });
  }
  private async populateRefObj(): Promise<void> {
    if (this.sessionData && this.sessionData.routine != null) {
      let routineKeys: string[] = Object.keys(this.sessionData.routine);
      // console.log('all keys', routineKeys);
      routineKeys.forEach((key) => {
        this.passRefObject.routine[key] = this.sessionData.routine[key];
      });
    }
  }

  public setSchedule(): void {
    console.log('Now the data is');
    console.log('before..', this.passRefObject);
    let routine: any = {};
    Object.assign(routine, this.passRefObject);
    delete routine.createdYogas;
    delete routine.defaultYogas;
    console.log('set up', routine);
    console.log('after..', this.passRefObject);
  }
}
