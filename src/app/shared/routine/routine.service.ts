import { Injectable } from '@angular/core';
import { YogaListRef } from 'src/app/models/routine/routine.modal';

@Injectable({
  providedIn: 'root',
})
export class RoutineService {
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
  constructor() {}
}
