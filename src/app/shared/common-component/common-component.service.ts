import { Injectable } from '@angular/core';
import {
  AlertController,
  //IonRouterOutlet,
  LoadingController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { AlertModalComponent } from 'src/app/components/alert-modal/alert-modal.component';
import { AlertMessage } from 'src/app/models/alert/alert.model';

@Injectable({
  providedIn: 'root',
})
export class CommonComponentService {
  loader: any;
  loderCount = 0;
  constructor(
    public alertController: AlertController,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public modelController: ModalController //public routerOutlet: IonRouterOutlet
  ) {}

  // async presentAlert(header, message, buttons?: any) {
  //   const defaultDuttons: any = {
  //     Success: [
  //       {
  //         text: 'Ok',
  //         role: 'ok',
  //         cssClass: 'ok-button',
  //         handler: () => {
  //           console.log('Confirm Ok');
  //         },
  //       },
  //     ],
  //     Error: [
  //       {
  //         text: 'Dismiss',
  //         role: 'error',
  //         cssClass: 'error-button',
  //         handler: () => {
  //           console.log('Confirm Ok');
  //         },
  //       },
  //     ],
  //   };

  //   const alert = this.alertController.create({
  //     cssClass: 'my-custom-class',
  //     header,
  //     // subHeader: subtitle,
  //     message,
  //     buttons: buttons ? buttons : defaultDuttons[header],
  //   });

  //   (await alert).present();
  // }
  // presentAlertConfirm(header, message, buttons?: any) {
  //   return new Promise(async (resolve) => {
  //     // process buttons
  //     let newButtons = [];
  //     if (buttons) {
  //       newButtons = buttons.map((b) => {
  //         return {
  //           text: b.text,
  //           role: b.role,
  //           cssClass: '',
  //           handler: () => {
  //             b.handler();
  //             resolve(b.resolve);
  //           },
  //         };
  //       });
  //     }
  //     const alert = await this.alertController.create({
  //       header,
  //       message,
  //       buttons: buttons
  //         ? newButtons
  //         : [
  //             {
  //               text: 'Dismiss',
  //               role: 'cancel',
  //               cssClass: 'secondary',
  //               handler: () => {
  //                 resolve(false);
  //               },
  //             },
  //             {
  //               text: 'Ok',
  //               handler: () => {
  //                 resolve(true);
  //               },
  //             },
  //           ],
  //     });
  //     alert.present();
  //   });
  // }

  // ========[ loader ]========
  async showLoader(message: string = 'Please wait!', duration: number = 0) {
    // console.log("this.loader requested for ", message);
    // if(!this.loader){
    console.log('creating this.loader for ', message, this.loderCount);
    this.loader = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message,
      duration, // auto timeout limit
    });

    this.loderCount++;
    console.log(
      'creating this.loader for this.loderCount ',
      message,
      this.loderCount
    );
    return this.loader?.present();

    // }
  }

  async hideLoader(message: string = 'Hiding the loader') {
    console.log('this.loader', message, this.loader, this.loderCount);
    (await this.loader)?.dismiss();
    if (this.loderCount > 0) {
      this.loderCount--;
    }
    // this.loader = null;
    console.log(
      'this.loader post dismiss',
      message,
      this.loader,
      this.loderCount
    );
  }
  // =======[ toaster ]========
  async presentToaster(msg) {
    const toast = await this.toastController.create({
      message: msg,
      position: 'top',
      duration: 1800,
    });
    (await toast).present();
  }

  //=====[ alert modal ]=======
  errorAlert(errors: string[], mood = 'danger', clb?) {
    return this.setAlertMessage(errors, mood, clb);
  }
  sucessAlert(message: string, mood = 'success', clb?) {
    let successMsg = [message];
    return this.setAlertMessage(successMsg, mood, clb);
  }
  waringAlert(errors: string[], mood = 'waring', clb?) {
    return this.setAlertMessage(errors, mood, clb);
  }
  normalAlert(message: string, mood = 'normal', clb?) {
    let successMsg = [message];
    return this.setAlertMessage(successMsg, mood, clb);
  }
  setAlertMessage(messages, mood, clb?) {
    let alertMessage: AlertMessage = {
      message: messages,
      mood: mood,
      color: mood,
      icon:
        mood == 'success'
          ? 'checkmark-circle-outline'
          : mood == 'danger'
          ? 'close-circle-outline'
          : 'information-circle-outline',
      header:
        mood == 'success'
          ? 'Successfull !!'
          : mood == 'danger'
          ? 'Something went wrong !!'
          : 'Attention !!',
    };
    return this.presentModalAlert(alertMessage, clb);
  }

  async presentModalAlert(alertMessage: AlertMessage, clb?: any) {
    const modal = await this.modelController.create({
      component: AlertModalComponent,
      componentProps: alertMessage,
      cssClass: 'alert-modal-class',
      showBackdrop: true,
      swipeToClose: true,
      backdropDismiss: false,
      // presentingElement: this.routerOutlet.nativeEl,
      presentingElement: await this.modelController.getTop(),
    });

    modal.onDidDismiss().then((data: any) => {
      if (clb && data.data.responseback) {
        clb(data);
      }
      return data;
    });
    return await modal.present();
  }
}
