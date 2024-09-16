import { Component } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButtonModule,
    RouterLink
  ],
  styles: [`
    div[fxLayout] {
      margin-top: 32px;
    }
  `],
  template: `
    <div fxLayout="column" fxLayoutAlign="center center">
      <span class="mat-headline-3">Hello, lemon Wolfgang!</span>
      <button mat-raised-button color="primary">Login as Manager</button>
    </div>
  `
})
export class HomeComponent {

}
