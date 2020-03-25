import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-verify-email-form',
  templateUrl: './verify-email-form.component.html',
  styleUrls: ['./verify-email-form.component.scss'],
})
export class VerifyEmailFormComponent implements OnInit {
  constructor(
    public authService: AuthenticationService,
  ) { }

  ngOnInit() { }

  sendVerificationMail(): Promise<void> {
    return this.authService.sendVerificationMail();
  }
}
