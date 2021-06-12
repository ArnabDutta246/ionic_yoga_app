import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Session } from 'src/app/models/session/session.model';

import { Yoga } from 'src/app/models/yoga/yoga.model';
import { CommonComponentService } from 'src/app/shared/common-component/common-component.service';
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
    private modalController: ModalController,
    private common: CommonComponentService
  ) {}
  // init
  ngOnInit() {}

  // on destroy
  ngOnDestroy() {
    //this.session.watch().unsubscribe();
  }

  // get session data
  private getSessionData(): void {
    this.session.watch().subscribe((res) => {
      this.sessionData = res;
      this.segmentChanged();
    });
  }

  ionViewDidEnter() {
    this.getSessionData();
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
  public goToCreateYoga(): void {
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

  // go to edit page
  public updateYoga(yoga: Yoga): void {
    this.router.navigate(['home/yogas/update-yoga'], {
      state: { data: { yoga: yoga } },
    });
  }
  // delete action
  public deleteAction(yoga: Yoga): void {
    this.yogaService
      .deleteYoga(yoga.id)
      .then((res) => (res ? this.successMsg() : this.errorHandler()));
  }

  // deleted successfull
  private successMsg(): void {
    this.common.sucessAlert('This yoga deleted successfully');
  }
  // delete yoga
  private deleteYoga(yoga: Yoga): void {
    this.common.warningAlert(
      ['Are you sure? you want to delete this yoga form list?'],
      'warning',
      this.deleteAction.bind(this, yoga)
    );
  }
  // err handler
  private errorHandler(): void {
    this.common.errorAlert(
      ['Please Check and try again. Something went wrong'],
      'danger'
    );
  }
}
