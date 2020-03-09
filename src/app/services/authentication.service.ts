import { Observable } from 'rxjs';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { functions, auth } from 'firebase';
import { User } from '../model/user';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userData: Observable<firebase.User>;

  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private http: HttpClient
  ) {
    this.userData = this.ngFireAuth.authState;
    this.ngFireAuth.authState.subscribe(user => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  getUser(): Observable<firebase.User> {
    return this.userData;
  }

  // Login in with email/password
  signIn(email: string, password: string): Promise<auth.UserCredential> {
    return this.ngFireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  // Register user with email/password
  registerUser(email: string, password: string): Promise<auth.UserCredential> {
    return this.ngFireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  // Email verification when new user register
  sendVerificationMail(): Promise<void> {
    return this.ngFireAuth.auth.currentUser.sendEmailVerification();
  }

  // Recover password
  passwordRecover(passwordResetEmail: string): Promise<void> {
    return this.ngFireAuth.auth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email has been sent, please check your inbox.');
    }).catch((error) => {
      window.alert(error);
    });
  }

  // Returns true when user is looged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // Returns true when user's email is verified
  get isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('Email verified : ' + (user.emailVerified !== false) ? true : false);
    return (user.emailVerified !== false) ? true : false;
  }

  // Sign in with Gmail
  googleAuth(): Promise<void> {
    return this.authLogin(new auth.GoogleAuthProvider());
  }

  // Auth providers
  authLogin(provider): Promise<void> {
    return this.ngFireAuth.auth.signInWithPopup(provider)
    .then((result) => {
      this.ngZone.run(() => {
        this.router.navigate(['profile']);
      });
      this.setUserData(result.user);
    }).catch((error) => {
      window.alert(error);
    });
  }

  // Store user in localStorage
  setUserData(user): Promise<void> {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  // Sign-out
  signOut(): Promise<void> {
    return this.ngFireAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }

  /*getAllUsers(): Promise<any> {
    //return this.http.get('https://us-central1-todolist-8b030.cloudfunctions.net/api').toPromise();
    return this.http.get('https://www.google.com/').toPromise();
    //return functions().httpsCallable('getAllUsers')();
  }*/
}
