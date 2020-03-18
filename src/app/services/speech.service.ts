import { Injectable } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpeechService {
  private hasPermission: boolean;

  constructor(private speechRecognition: SpeechRecognition) { }

  checkAndRequestPermissions(): Promise<void> {
    return this.speechRecognition.hasPermission().then((hasPermission: boolean) => {
      this.hasPermission = hasPermission;
      return this.speechRecognition.requestPermission().then(() => {
        console.log('Granted');
        this.hasPermission = true;
      }, () => console.log('Denied'));
    });
  }

  listenAndGetResult(): Promise<string> {
    let message = '';
    return this.speechRecognition.isRecognitionAvailable().then((available: boolean) => {
      console.log(available);
      if (this.hasPermission && available) {
          this.speechRecognition.startListening().subscribe((matches: string[]) => {
            for (const match of matches) {
              message += match;
            }
            return message;
          }, (onerror) => {
            console.log('error:', onerror);
            return message;
          });
      } else {
        return message;
      }
    });
  }

  getHasPermission(): boolean {
    return this.hasPermission;
  }
}
