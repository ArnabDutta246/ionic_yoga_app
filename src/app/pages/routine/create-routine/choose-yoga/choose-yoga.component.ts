import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Yoga } from 'src/app/models/yoga/yoga.model';

@Component({
  selector: 'app-choose-yoga',
  templateUrl: './choose-yoga.component.html',
  styleUrls: ['./choose-yoga.component.scss'],
})
export class ChooseYogaComponent implements OnInit, OnChanges {
  //variables
  @Input() passRefObject: any;
  @Input() sessionData: any;
  @Input() sessionDataCopyRef: any;

  allYogas: Yoga[] = null;
  selectedYogas: Yoga[] = null;

  // variables
  week = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  showWeekDays: boolean = false;
  setDailyOrWeekly: string;
  // constructor
  constructor() {}

  // init
  ngOnInit() {
    this.setUpData('init');
  }

  // changes
  ngOnChanges() {
    this.setUpData('onchanges');
  }

  private setUpData(state: string): void {
    this.passRefObject = this.passRefObject;
    this.sessionData = this.sessionData;
    this.sessionDataCopyRef = this.sessionDataCopyRef;
  }

  // toggle daily / weekdays
  setUpYogaRoutine(e = null) {
    let event = e != null ? e.detail.value : null;
    if (event != null) {
      this.showWeekDays = !this.showWeekDays;
      this.setDailyOrWeekly = event;
    }
  }
}
