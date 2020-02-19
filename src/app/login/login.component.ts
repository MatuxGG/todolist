import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  user: Observable<firebase.User>;

  constructor(
    public authService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {}

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
    return this.authService.googleAuth().then(
      s => { console.log(this.authService.userData); }
    );
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
}
