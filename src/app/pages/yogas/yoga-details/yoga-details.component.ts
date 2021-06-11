import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Yoga } from 'src/app/models/yoga/yoga.model';

@Component({
  selector: 'app-yoga-details',
  templateUrl: './yoga-details.component.html',
  styleUrls: ['./yoga-details.component.scss'],
})
export class YogaDetailsComponent implements OnInit, OnDestroy {
  @Input() yoga: Yoga;
  constructor() {}

  ngOnInit() {}
  ngOnDestroy() {}
}
