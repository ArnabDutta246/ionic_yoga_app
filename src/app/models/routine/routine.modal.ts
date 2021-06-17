import { Yoga } from '../yoga/yoga.model';

export interface YogaListRef {
  createdYogas: Yoga[];
  defaultYogas: Yoga[];
  routine: Routine;
}
export interface Routine {
  daily: Yoga[];
  sun: Yoga[];
  mon: Yoga[];
  tue: Yoga[];
  wed: Yoga[];
  thu: Yoga[];
  fri: Yoga[];
  sat: Yoga[];
}
