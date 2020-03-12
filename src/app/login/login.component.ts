import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { async } from '@angular/core/testing';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: firebase.User;

  constructor(
    public authService: AuthenticationService,
    private router: Router,
    private toastController: ToastController) { }

  ngOnInit() {
    this.authService.getUser().subscribe(
      (user) => { this.user = user; }
    );
   }

  login(email, password) {
    this.authService.signIn(email.value, password.value)
      .then((res) => {
        if (this.authService.isEmailVerified) {
          this.router.navigate(['profile']);
        } else {
          this.toastController.create({
            message: 'Email is not verified',
            duration: 2000
          }).then( (toasting: HTMLIonToastElement) => {
            toasting.present();
          });
          return false;
        }
      }).catch((error) => {
        console.log(error.message);
        this.toastController.create({
          message: error.message,
          duration: 2000
        }).then( (toasting: HTMLIonToastElement) => {
          toasting.present();
        });
      });
  }

  googleAuth(): Promise<void> {
    return this.authService.googleAuth();
  }

  register() {
    this.router.navigate(['register']);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  logout(): Promise<void> {
    return this.authService.signOut();
  }

  getUser(): firebase.User {
    return this.user;
  }

  profile(): void {
    if (this.authService.isEmailVerified) {
      this.router.navigate(['profile']);
    } else {
      window.alert('Email is not verified');
    }
  }
}
