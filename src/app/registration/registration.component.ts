import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  constructor(
    public authService: AuthenticationService,
    public router: Router,
  ) { }

  ngOnInit() {}

  signUp(email: { value: any; }, password: { value: any; }) {
      this.authService.RegisterUser(email.value, password.value)
      .then((res) => {
        this.authService.SendVerificationMail();
        this.router.navigate(['verify-email']);
      }).catch((error) => {
        window.alert(error.message);
      });
  }
}
