import { AuthenticationService } from '../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
})
export class ProfileFormComponent implements OnInit {
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

  changeLang(lg: string): void {
    this.translate.use(lg);
  }
}
