export interface YogaListRef {
  cretadYogas: [];
  defaultYogas: [];
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
