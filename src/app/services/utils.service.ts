import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private toastMsgs: string[] = [];

  constructor(private toastController: ToastController) { }

  showToaster(message: string, duration: number): Promise<void | HTMLIonToastElement> {
    this.toastMsgs.push(message);
    return this.toastController.create({
      message: this.toastMsgs.toString().split(',').join('\n'),
      duration
    }).then((toast: HTMLIonToastElement) => {
      toast.present();
      toast.onDidDismiss().then(() => {
          this.toastMsgs = [];
      });
    });
  }
}
