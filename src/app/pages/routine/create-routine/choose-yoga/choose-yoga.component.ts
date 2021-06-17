import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { YogaListRef } from 'src/app/models/routine/routine.modal';
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
  currActiveArr: string = 'daily';
  prevActiveArr: string = 'daily';
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
    this.setUpYogaRoutineFor(null);
  }

  // find curr daily/this day's yoga
  private async findCurrActiveYoga(
    collection: string,
    category: string
  ): Promise<void> {
    this.passRefObject[collection] = this.passRefObject[collection].map(
      (yoga: Yoga) => {
        let findIndex =
          this.sessionDataCopyRef.routine !== null
            ? this.sessionDataCopyRef.routine[category].find(
                (item: Yoga) => item.id == yoga.id
              )
            : [];
        yoga.isSelected = findIndex.length > 0 ? true : false;
        return yoga;
      }
    );
    console.log('array', this.passRefObject);
  }

  // toggle daily / weekdays
  public async setUpYogaRoutineFor(e = null): Promise<void> {
    let event = e != null ? e.detail.value : null;
    if (event != null) {
      this.showWeekDays = !this.showWeekDays;
      this.setDailyOrWeekly = event;
    }
    this.prevActiveArr = this.currActiveArr;
    await this.resetPrevState();
    this.currActiveArr = event == 'weekly' ? 'sun' : 'daily';
    await this.findCurrActiveYoga('createdYogas', this.currActiveArr);
    await this.findCurrActiveYoga('defaultYogas', this.currActiveArr);
  }

  // on weekdays change
  public async onWeekDayChanges(i: number): Promise<void> {
    this.currDayIndex = i;
    this.prevActiveArr = this.currActiveArr;
    await this.resetPrevState();
    this.currActiveArr = this.week[i];
    await this.findCurrActiveYoga('createdYoga', this.week[i]);
    await this.findCurrActiveYoga('defaultYoga', this.week[i]);
  }

  // add or remove yogas form list
  public addOrRemoveYoga(collection: string, selectedYoga: Yoga): void {
    selectedYoga.isSelected = selectedYoga.isSelected
      ? !selectedYoga.isSelected
      : true;
    let isExist = this.isExistBefore(selectedYoga);
    if (isExist) {
      this.removeFromList(selectedYoga);
    } else {
      this.addInList(selectedYoga);
    }
  }

  // check before exist
  private isExistBefore(yoga: Yoga): boolean {
    let findIndex = this.passRefObject.routine[this.currActiveArr].find(
      (item: Yoga) => item.id == yoga.id
    );
    return findIndex == undefined ? false : true;
  }

  // remove from
  private removeFromList(removeYoga: Yoga): void {
    let list = this.passRefObject.routine[this.currActiveArr];
    list = list.filter((yoga: Yoga) => yoga.id !== removeYoga.id);
  }
  // add new
  private addInList(addYoga: Yoga): void {
    let list = this.passRefObject.routine[this.currActiveArr];
    list.push(addYoga);
  }

  // reset prev state
  private async resetPrevState(): Promise<void> {
    let copyRef = this.sessionDataCopyRef.routine;
    console.log('now copy ref', copyRef);
    this.passRefObject.routine[this.prevActiveArr] =
      copyRef !== null ? copyRef[this.prevActiveArr] : [];
  }
}
