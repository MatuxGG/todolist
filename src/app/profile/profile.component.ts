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
    public translate: TranslateService,
    private router: Router) {
      this.user = undefined;
  }

  ngOnInit() {
    this.authService.getUser().subscribe(
      (user) => { this.user = user; }
    );
  }

  todolists(): void {
    this.router.navigate(['todolists']);
  }

  changeLang(lg: any): void {
    this.translate.use(lg);
  }
}
