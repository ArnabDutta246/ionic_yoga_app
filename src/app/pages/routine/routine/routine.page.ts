import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { Session } from 'src/app/models/session/session.model';
import { Yoga } from 'src/app/models/yoga/yoga.model';
import { SessionService } from 'src/app/shared/session/session.service';
import { YogaDetailsComponent } from '../../yogas/yoga-details/yoga-details.component';

@Component({
  selector: 'app-routine',
  templateUrl: './routine.page.html',
  styleUrls: ['./routine.page.scss'],
})
export class RoutinePage implements OnInit {
  // variables
  week = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  currWeekList: any = [];
  currDayIndex: number = 0;
  todaysYogaList: Yoga[] | null = null;
  sessionData: Session;

  // constructor
  constructor(
    private router: Router,
    private session: SessionService,
    private modalController: ModalController
  ) {}
  // init
  async ngOnInit() {}
  // get session data
  private getSessionData(): void {
    this.session.watch().subscribe(async (res) => {
      this.sessionData = res;
    });
  }
  // iondidload
  ionViewDidEnter() {
    this.getSessionData();
    this.setWeek();
  }

  // set the week calender
  public setWeek(): void {
    this.currWeekList = [];
    let sunday: string = moment().day(0).format();
    this.currWeekList.push(sunday);
    for (let i = 1; i < 7; i++) {
      let day = moment().day(i).format();
      this.currWeekList.push(day);
      if (moment().format() == day) this.currDayIndex = i;
    }
    // console.log(this.currWeekList);
    this.fetchRoutine(this.currDayIndex);
  }

  // fetch data on this selected date
  public fetchRoutine(i: number): void {
    this.currDayIndex = i;
    this.todaysYogaList =
      this.sessionData.routine !== null
        ? [
            ...this.sessionData.routine['daily'],
            ...this.sessionData.routine[this.week[i]],
          ]
        : null;
  }

  // go to create routine
  goToRoutineSetup() {
    this.router.navigate(['/home/routine/create-routine']);
  }

  // go to yoga details page
  async yogaDetailsModal(yoga: Yoga): Promise<any> {
    const modal = await this.modalController.create({
      component: YogaDetailsComponent,
      componentProps: yoga,
      cssClass: '',
      showBackdrop: true,
      swipeToClose: true,
      backdropDismiss: false,
      // presentingElement: this.routerOutlet.nativeEl,
      presentingElement: await this.modalController.getTop(),
    });
    return await modal.present();
  }
}
