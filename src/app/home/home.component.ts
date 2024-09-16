import { Component } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {FlexModule} from "@ngbracket/ngx-layout/flex";

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
      <button mat-raised-button color="primary" routerLink="/manager">
        Login as Manager
      </button>
    </div>
  `
})
export class HomeComponent {

}
