import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PosRoutingModule } from './pos-routing.module';
import {PosComponent} from "./pos/pos.component";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PosRoutingModule,
    PosComponent
  ]
})
export class PosModule { }
