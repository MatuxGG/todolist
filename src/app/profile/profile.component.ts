import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: firebase.User;

  constructor(
    public authService: AuthenticationService,
    private router: Router,
    private translate: TranslateService) { }

  ngOnInit() {
    this.authService.getUser().subscribe(
      (user) => { this.user = user; }
    );
  }

  getUser(): firebase.User {
    return this.user;
  }

  todolists(): void {
    this.router.navigate(['todolists']);
  }

  changeLang(lg): void {
    this.translate.use(lg);
  }
}
