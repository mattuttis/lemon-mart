import { Component } from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {FlexModule} from "@ngbracket/ngx-layout";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {MatAnchor} from "@angular/material/button";

@Component({
  selector: 'app-inventory',
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
        Inventory Dashboard
      </a>
      <a mat-button routerLink="stock-entry" routerLinkActive="active-link">
        Stock Entry
      </a>
      <a mat-button routerLink="products" routerLinkActive="active-link">Products</a>
      <a mat-button routerLink="categories" routerLinkActive="active-link">Categories</a>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styles: `
    .active-link {
      font-weight: bold;
      border-bottom: 2px solid #005005;
    }
  `
})
export class InventoryComponent {

}
