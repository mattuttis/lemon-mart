import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatToolbar} from "@angular/material/toolbar";
import {MatAnchor, MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {MatIcon, MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {MatTooltip} from "@angular/material/tooltip";
import {FlexModule} from "@ngbracket/ngx-layout";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbar, MatAnchor, RouterLink, MatIcon, MatIconButton, MatMiniFabButton, MatTooltip, FlexModule],
  template: `
    <mat-toolbar color="primary" fxLayoutGap="8px">
      <button mat-icon-button>
        <mat-icon>menu</mat-icon>
      </button>
      <mat-icon svgIcon="lemon"></mat-icon>
      <a mat-button routerLink="/home"><h1>LemonMart</h1></a>
      <span class="flex-spacer"></span>

      <button mat-mini-fab routerLink="/user/profile"
              matTooltip="Profile" aria-label="User Profile">
        <mat-icon>account_circle</mat-icon>
      </button>
      <button mat-mini-fab routerLink="/user/logout"
              matTooltip="Logout" aria-label="Logout">
        <mat-icon>lock_open</mat-icon>
      </button>

    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styles: ``
})
export class AppComponent {
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      'lemon',
      sanitizer.bypassSecurityTrustResourceUrl(
        'assets/img/icons/lemon.svg'
      )
    )
  }
  title = 'lemon-mart';
}
