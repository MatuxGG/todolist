import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: firebase.User;

  constructor(
    public authService: AuthenticationService,
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

  logout(): Promise<void> {
    return this.authService.signOut();
  }
}
