import { Routine } from '../routine/routine.modal';
import { User } from '../user/user.model';
import { Yoga } from '../yoga/yoga.model';

export interface Session {
  user: User;
  yogas: Yoga[];
  routine: Routine;
}
