import { Component } from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {FlexModule} from "@ngbracket/ngx-layout";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {MatAnchor} from "@angular/material/button";

@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [
    MatToolbar,
    FlexModule,
    RouterOutlet,
    MatAnchor,
    RouterLink,
    RouterLinkActive
  ],
  template: `
    <mat-toolbar color="accent" fxLayoutGap="8px">
      <a mat-button routerLink="home" routerLinkActive="active-link">
        Manager's Dashboard
      </a>
      <a mat-button routerLink="users" routerLinkActive="active-link">
        User Management
      </a>
      <a mat-button routerLink="receipts" routerLinkActive="active-link">
        Receipt Lookup
      </a>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styles: `
    div[fxLayout] {
      margin-top: 32px;
    }
    .active-link {
      font-weight: bold;
      border-bottom: 2px solid #005005;
    }
  `
})
export class ManagerComponent {

}
