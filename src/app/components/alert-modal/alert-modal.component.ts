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
    private modelController: ModalController,
    public navParams: NavParams
  ) {}

  ngOnInit() {
    this.alertMessage = this.navParams.data as AlertMessage;
    // console.log(this.navParams.data);
    // console.log(this.navParams.get('alertMessage'));
    console.log('oninit', this.alertMessage);
  }
  ngOnChanges() {
    this.alertMessage = this.navParams.data as AlertMessage;
    console.log('onchanges', this.alertMessage);
  }

  dismiss() {
    this.modelController.dismiss({
      backData: 'backdata',
    });
  }
}
