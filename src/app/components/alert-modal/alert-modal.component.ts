import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { AlertMessage } from 'src/app/models/alert/alert.model';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss'],
})
export class AlertModalComponent implements OnInit, OnChanges {
  alertMessage: any;
  constructor(
    private modalController: ModalController,
    public navParams: NavParams
  ) {}

  ngOnInit() {
    this.alertMessage = this.navParams.data as AlertMessage;
  }
  ngOnChanges() {
    this.alertMessage = this.navParams.data as AlertMessage;
  }

  dismiss(response: boolean) {
    console.log('alert response', response);
    this.modalController.dismiss({
      responseback: response,
    });
  }
}
