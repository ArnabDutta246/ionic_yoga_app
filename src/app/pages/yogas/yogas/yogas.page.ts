import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Session } from 'src/app/models/session/session.model';

import { Yoga } from 'src/app/models/yoga/yoga.model';
import { SessionService } from 'src/app/shared/session/session.service';
import { YogasService } from 'src/app/shared/yogas/yogas.service';
import { YogaDetailsComponent } from '../yoga-details/yoga-details.component';

@Component({
  selector: 'app-yogas',
  templateUrl: './yogas.page.html',
  styleUrls: ['./yogas.page.scss'],
})
export class YogasPage implements OnInit, OnDestroy {
  // variables
  session$;
  sessionData: Session;
  currActiveListName: string = 'default';
  currActiveListData: Yoga[] | null;
  // constructor
  constructor(
    private yogaService: YogasService,
    private router: Router,
    private session: SessionService,
    private modalController: ModalController
  ) {}
  // init
  ngOnInit() {}

  ngOnDestroy() {
    this.session.watch().unsubscribe();
  }

  // get session data
  private getSessionData(): void {
    this.session.watch().subscribe((res) => {
      this.sessionData = res;
    });
  }

  ionViewDidEnter() {
    this.getSessionData();
    this.segmentChanged();
  }

  // toggle segment
  public segmentChanged(e = null): void {
    this.currActiveListName =
      e != null && e.detail.value !== 'undefiend'
        ? e.detail.value
        : this.currActiveListName;
    if (this.currActiveListName == 'default') {
      this.defaultAll();
      return;
    }
    this.fetchAll(this.currActiveListName);
  }

  // fetch
  private fetchAll(filterType: string): void {
    let yogasAvailble = this.sessionData.yogas;
    if (filterType !== 'favourite') {
      this.currActiveListData = yogasAvailble;
    } else {
      this.currActiveListData =
        yogasAvailble != null
          ? yogasAvailble.filter((yoga: Yoga) => yoga.isFavourite == true)
          : yogasAvailble;
    }
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
  // go to create yoga
  goToCreateYoga(): void {
    this.router.navigate(['/home/yogas/create-yoga']);
  }

  // go to yoga details page
  async yogaDetailsModal(yoga: Yoga): Promise<any> {
    const modal = await this.modalController.create({
      component: YogaDetailsComponent,
      componentProps: yoga,
      cssClass: '',
      showBackdrop: true,
      swipeToClose: true,
      backdropDismiss: false,
      // presentingElement: this.routerOutlet.nativeEl,
      presentingElement: await this.modalController.getTop(),
    });
    return await modal.present();
  }
}
