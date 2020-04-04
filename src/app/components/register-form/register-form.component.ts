import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  constructor(
    public authService: AuthenticationService,
    public router: Router,
  ) { }

  ngOnInit() {}

  signUp(email, password) {
      console.log(email.value, password.value);
      this.authService.registerUser(email.value, password.value)
      .then((res) => {
        this.router.navigate(['profile']);
        // We don't want to verify email here
        /*console.log('Before Send Verification mail');
        this.authService.sendVerificationMail().then(
            () => { this.router.navigate(['verify-email']); }
        );*/
      }).catch((error) => {
        window.alert(error.message);
        console.log(error.message);
      });
  }
}
