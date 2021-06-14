import { Yoga } from '../yoga/yoga.model';

export interface YogaListRef {
  creatadYogas: Yoga[];
  defaultYogas: Yoga[];
  routine: Routine;
}
export interface Routine {
  daily: YogaRef[];
  sun: YogaRef[];
  mon: YogaRef[];
  tue: YogaRef[];
  wed: YogaRef[];
  thu: YogaRef[];
  fri: YogaRef[];
  sat: YogaRef[];
}

export interface YogaRef {
  yogaId: string;
  collection: string;
}
