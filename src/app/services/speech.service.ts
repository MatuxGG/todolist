import { TranslateService } from '@ngx-translate/core';
import { UtilsService } from './utils.service';
import { Injectable } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpeechService {
  private hasPermission: boolean;

  constructor(private speechRecognition: SpeechRecognition,
              private utilsService: UtilsService,
              private translateService: TranslateService) {
    this.hasPermission = false;
  }

  checkAndRequestPermissions(): Promise<void> {
    return this.speechRecognition.hasPermission().then((hasPermission: boolean) => {
      if (hasPermission === true) {
        this.hasPermission = hasPermission;
      } else {
        return this.speechRecognition.requestPermission().then(() => {
          this.utilsService.showToaster('Permission granted', 2000);
          this.hasPermission = true;
        }, () => {
          this.utilsService.showToaster('Permission Denied', 2000);
          this.hasPermission = false;
        });
      }
    });
  }

  listenAndGetResult(): Promise<string> {
    const options = {
      language: this.translateService.instant('lang')
    };
    let message = '';
    return this.speechRecognition.isRecognitionAvailable().then((available: boolean) => {
      if (!available) {
        this.utilsService.showToaster('Speech recognition not available', 2000);
      }
      if (this.hasPermission && available) {
          this.speechRecognition.startListening(options).subscribe((matches: string[]) => {
            for (const match of matches) {
              message += match;
            }
            return message;
          }, (onerror) => {
            console.log('error:', onerror);
            return message;
          });
      } else {
        return '';
      }
    });
  }

  getHasPermission(): boolean {
    return this.hasPermission;
  }
}
