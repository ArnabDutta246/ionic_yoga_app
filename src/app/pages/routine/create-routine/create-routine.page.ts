import { Component, OnInit } from '@angular/core';
import { YogaListRef } from 'src/app/models/routine/routine.modal';
import { Session } from 'src/app/models/session/session.model';
import { Yoga } from 'src/app/models/yoga/yoga.model';

import { SessionService } from 'src/app/shared/session/session.service';
import { YogasService } from 'src/app/shared/yogas/yogas.service';

@Component({
  selector: 'app-create-routine',
  templateUrl: './create-routine.page.html',
  styleUrls: ['./create-routine.page.scss'],
})
export class CreateRoutinePage implements OnInit {
  // variables
  chooseYoga: boolean = true;
  sessionData: Session;
  passRefObject: YogaListRef = {
    creatadYogas: [],
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
  sessionDataCopyRef: Session | {} = {};
  // constructor
  constructor(
    private session: SessionService,
    private yogaService: YogasService
  ) {}
  // init
  ngOnInit() {}
  // get session data
  private getSessionData(): void {
    this.session.watch().subscribe((res) => {
      this.sessionData = res;
      // copy
      Object.assign(this.sessionDataCopyRef, this.sessionData);
      this.passRefObject.creatadYogas = this.sessionData.yogas;
      //
      this.fetchAllYogas();
      // console.log(this.sessionData);
      // console.log(this.sessionDataCopyRef);
    });
  }
  // iondidload
  ionViewDidEnter() {
    this.getSessionData();
  }
  // fetch All yogas [ default + created ]
  fetchAllYogas() {
    this.yogaService.getDefaultYogas().then((res) => {
      this.passRefObject.defaultYogas = res;
      console.log('..', this.passRefObject);
    });
  }
}
