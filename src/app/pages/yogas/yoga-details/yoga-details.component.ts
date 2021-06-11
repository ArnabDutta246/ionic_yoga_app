import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Yoga } from 'src/app/models/yoga/yoga.model';

@Component({
  selector: 'app-yoga-details',
  templateUrl: './yoga-details.component.html',
  styleUrls: ['./yoga-details.component.scss'],
})
export class YogaDetailsComponent implements OnInit, OnDestroy {
  @Input() yoga: Yoga = null;
  // construct
  constructor(
    private modalController: ModalController,
    public navParams: NavParams
  ) {}
  //init
  ngOnInit() {
    this.yoga = this.navParams.data as Yoga;
    console.log(this.yoga);
  }
  // destroy
  ngOnDestroy() {}

  // modal dismiss
  dismiss() {
    this.modalController.dismiss();
  }

  // favourite
  putInFavourite() {
    this.yoga.isFavourite = !this.yoga.isFavourite;
  }
}
