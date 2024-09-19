import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../auth/auth.service";
import {FlexModule} from "@ngbracket/ngx-layout";
import {combineLatest, filter, tap} from "rxjs";
import {InMemoryAuthService} from "../auth/auth.in-memory.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButtonModule,
    RouterLink,
    FlexModule
  ],
  styles: `
      div[fxLayout] {
        margin-top: 32px;
      }
  `,
  template: `
    <div fxLayout="column" fxLayoutAlign="center center">
      <span class="mat-headline-3">Hello, Limoncu!</span>
      <button mat-raised-button color="primary" (click)="login()">
        Login as Manager
      </button>
    </div>
  `
})
export class HomeComponent implements OnInit{

  constructor(private authService: InMemoryAuthService,
              private router: Router) {}

  ngOnInit(): void {}

  login() {
    this.authService.login('manager@test.com', '12345678')
    combineLatest([
      this.authService.authStatus$, this.authService.currentUser$
    ])
      .pipe(
        filter(([authStatus, user]) =>
          authStatus.isAuthenticated && user?._id !== ''
        ),
        tap(() => {
          this.router.navigate(['/manager'])
        })
      )
      .subscribe()
  }
}
