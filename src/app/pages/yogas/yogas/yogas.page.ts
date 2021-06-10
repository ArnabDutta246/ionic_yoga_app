import { Component, OnInit } from '@angular/core';
import { Yoga } from 'src/app/models/yoga/yoga.model';
import { YogasService } from 'src/app/shared/yogas/yogas.service';

@Component({
  selector: 'app-yogas',
  templateUrl: './yogas.page.html',
  styleUrls: ['./yogas.page.scss'],
})
export class YogasPage implements OnInit {
  currActiveListName: string = 'created';
  currActiveListData: Yoga[] = [];
  constructor(private yogaService: YogasService) {}

  ngOnInit() {}

  public segmentChanged(e?): void {
    console.log(e);
    let value = e.detail.value;
    this.currActiveListName = value ? value : this.currActiveListName;
    if (value == 'default') {
      this.defaultAll();
      return;
    }
    this.fetchAll();
  }

  // fetch
  private fetchAll(): void {
    this.yogaService
      .fetchAllYogas()
      .then((res) => (this.currActiveListData = res))
      .catch((err) => {
        console.log(err);
        this.yogaService.errHandler(err);
      });
  }

  // defaults
  private defaultAll(): void {
    this.yogaService
      .getDefaultYogas()
      .then((res) => (this.currActiveListData = res))
      .catch((err) => {
        console.log(err);
        this.yogaService.errHandler(err);
      });
  }
}
