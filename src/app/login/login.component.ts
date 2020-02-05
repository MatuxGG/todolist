import { redirectLoggedInTo } from '@angular/fire/auth-guard';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/npx';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(public afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit() {}

  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then( (result) => {
      if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = result.credential.accessToken;
        console.log(token);
      }
      // The signed-in user info.
      const user = result.user;
      console.log(user);
    }).catch( (error) =>  {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      console.log(errorCode, errorMessage, email, credential);
    });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  profile() {
    //this.router.navigate(['profile']);
  }
}
