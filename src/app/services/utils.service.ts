import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private toastController: ToastController) { }

  showToaster(message: string, duration: number): Promise<void | HTMLIonToastElement> {
    return this.toastController.create({
      message,
      duration
    }).then((toasting: HTMLIonToastElement) => {
      toasting.present();
    });
  }
}
