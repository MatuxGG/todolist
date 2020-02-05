import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Platform } from 'ionic-angular';
import { Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  user: Observable<firebase.User>;

  constructor(
    public afAuth: AngularFireAuth,
    private gplus: GooglePlus,
    private platform: Platform,
    private router: Router) {
    this.user = this.afAuth.authState;
  }

  ngOnInit() {}

  async nativeGoogleLogin(): Promise<void> {
    try {
      const gplusUser = await this.gplus.login({
        webClientId: 'your-webClientId-XYZ.apps.googleusercontent.com',
        offline: true,
        scopes: 'profile email'
      });
      await this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken));
    } catch (err) {
      console.log(err);
    }
  }

  async webGoogleLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup(provider);
    } catch (err) {
      console.log(err);
    }
  }

  googleLogin() {
    if (this.platform.is('cordova')) {
      this.nativeGoogleLogin();
    } else {
      this.webGoogleLogin();
    }
  }

  signOut() {
    this.afAuth.auth.signOut();
  }

  login() {
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  profile() {
    //this.router.navigate(['profile']);
  }
}
