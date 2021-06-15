import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { YogaListRef, YogaRef } from 'src/app/models/routine/routine.modal';
import { Session } from 'src/app/models/session/session.model';
import { Yoga } from 'src/app/models/yoga/yoga.model';

@Component({
  selector: 'app-choose-yoga',
  templateUrl: './choose-yoga.component.html',
  styleUrls: ['./choose-yoga.component.scss'],
})
export class ChooseYogaComponent implements OnInit, OnChanges {
  //variables
  @Input() passRefObject: YogaListRef;
  @Input() sessionData: Session;
  @Input() sessionDataCopyRef: Session;

  allYogas: Yoga[] = null;
  selectedYogas: Yoga[] = null;
  mergeArr: Yoga[];

  // variables
  week = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  showWeekDays: boolean = false;
  setDailyOrWeekly: string = 'daily';
  currDayIndex: number = 0;
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

  private setUpData(category: string): void {
    console.log(category);
    this.passRefObject = this.passRefObject;
    this.sessionData = this.sessionData;
    this.sessionDataCopyRef = this.sessionDataCopyRef;
    this.mergeArr = [
      ...this.passRefObject.createdYogas,
      ...this.passRefObject.defaultYogas,
    ];
    this.setUpYogaRoutineFor(null);
  }
  // find curr daily/this day's yoga
  private async findCurrActiveYoga(
    collection: string,
    category: string
  ): Promise<void> {
    console.log('collection', collection);
    console.log('category', category);
    console.log('array', this.passRefObject);
    console.log('array b', this.passRefObject[collection]);
    this.passRefObject[collection] = this.passRefObject[collection].map(
      (yoga: Yoga) => {
        let findIndex =
          this.sessionDataCopyRef.routine !== null
            ? this.sessionDataCopyRef.routine[category].find(
                (item: YogaRef) => item.id == yoga.id
              )
            : [];
        console.log('finde index', findIndex);
        yoga.isSelected = findIndex.length > 0 ? true : false;
        console.log(yoga);
        return yoga;
      }
    );
    console.log('array a', this.passRefObject[collection]);
  }

  // toggle daily / weekdays
  public async setUpYogaRoutineFor(e = null): Promise<void> {
    let event = e != null ? e.detail.value : null;
    if (event != null) {
      this.showWeekDays = !this.showWeekDays;
      this.setDailyOrWeekly = event;
    }
    console.log('current event', event);
    let category = event == 'weekly' ? 'sun' : 'daily';
    await this.findCurrActiveYoga('createdYogas', category);
    await this.findCurrActiveYoga('defaultYogas', category);
  }

  // on weekdays change
  public async onWeekDayChanges(i: number): Promise<void> {
    this.currDayIndex = i;
    await this.findCurrActiveYoga('createdYoga', this.week[i]);
    await this.findCurrActiveYoga('defaultYoga', this.week[i]);
  }

  // emit
  public emitThisData(): void {}

  // add or remove yogas form list
  public addOrRemoveYoga(collection: string, selectedYoga: Yoga): void {
    selectedYoga.isSelected = selectedYoga.isSelected
      ? !selectedYoga.isSelected
      : true;
    // console.log('selected yoga');
    // console.log(this.passRefObject[collection]);
    // this.passRefObject[collection] = this.passRefObject[collection].map(
    //   (yoga: Yoga) => {
    //     if (yoga.id == selectedYoga.id) {
    //       yoga.isSelected = yoga.isSelected ? !yoga.isSelected : true;
    //       return yoga;
    //     } else {
    //       return yoga;
    //     }
    //   }
    // );
    // console.log('selected yoga');
    // console.log(this.passRefObject[collection]);
  }
}
