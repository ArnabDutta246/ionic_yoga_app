import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Yoga } from 'src/app/models/yoga/yoga.model';

@Component({
  selector: 'app-routine',
  templateUrl: './routine.page.html',
  styleUrls: ['./routine.page.scss'],
})
export class RoutinePage implements OnInit {
  currWeekList: any = [];
  currDayIndex: number = 0;
  todaysYogaList: Yoga[] | null = null;
  constructor() {}

  ngOnInit() {
    this.setWeek();
  }
  public setWeek(): void {
    let sunday: string = moment().day(0).format();
    this.currWeekList.push(sunday);
    for (let i = 1; i < 7; i++) {
      let day = moment().day(i).format();
      this.currWeekList.push(day);
      if (moment().format() == day) this.currDayIndex = i;
    }
    console.log(this.currWeekList);
  }

  public fetchRoutine(i: number): void {
    this.currDayIndex = i;
  }
}
