import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: firebase.User;

  constructor(
    public authService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
    this.authService.getUser().subscribe(
      (user) => { this.user = user; }
    );
   }

  login(email: { value: any; }, password: { value: any; }) {
    this.authService.signIn(email.value, password.value)
      .then((res) => {
        if (this.authService.isEmailVerified) {
          this.router.navigate(['profile']);
        } else {
          window.alert('Email is not verified');
          return false;
        }
      }).catch((error) => {
        window.alert(error.message);
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
