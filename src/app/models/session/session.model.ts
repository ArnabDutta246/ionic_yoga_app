import { User } from '../user/user.model';
import { Yoga } from '../yoga/yoga.model';

export interface Session {
  user: User;
  yogas: Yoga[];
  routine: Routine;
}

export interface Routine {
  daily: string[];
  sun: string[];
  mon: string[];
  tue: string[];
  wed: string[];
  thu: string[];
  fri: string[];
}
