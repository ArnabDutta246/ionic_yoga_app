import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Yoga } from 'src/app/models/yoga/yoga.model';
import { YogasService } from 'src/app/shared/yogas/yogas.service';

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
    private navParams: NavParams,
    private yogaService: YogasService
  ) {}
  //init
  ngOnInit() {
    this.yoga = this.navParams.data as Yoga;
  }
  // on destroy
  ngOnDestroy() {}

  // modal dismiss
  public dismiss(): void {
    this.modalController.dismiss();
  }

  // favourite
  public putInFavourite(): void {
    this.yoga.isFavourite = !this.yoga.isFavourite;
    this.yogaService.markFavourite(this.yoga);
  }
}
