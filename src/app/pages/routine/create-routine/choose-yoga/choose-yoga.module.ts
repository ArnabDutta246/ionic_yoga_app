import { Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChooseYogaComponent } from './choose-yoga.component';
import { Yoga } from 'src/app/models/yoga/yoga.model';

@NgModule({
  declarations: [ChooseYogaComponent],
  imports: [CommonModule],
  exports: [ChooseYogaComponent],
})
export class ChooseYogaModule {
  @Input() refData: any;
  allYogas: Yoga[] = null;
  selectedYogas: Yoga[] = null;
  // const
  constructor() {}
}
