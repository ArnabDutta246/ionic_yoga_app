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
    cretadYogas: [],
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
    });
  }
  // iondidload
  ionViewDidEnter() {
    this.getSessionData();
  }
  // fetch All yogas [ default + created ]
  fetchAllYogas() {
    let getDefaultYogas: Yoga[] = [];
    this.yogaService.getDefaultYogas().then((res) => {
      getDefaultYogas = res;
    });
  }
}
