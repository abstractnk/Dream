import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ShellComponent } from './shell/shell.component';
import { Link1Component } from './link1/link1.component';


@NgModule({
  declarations: [ShellComponent, Link1Component],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  exports: [
    ShellComponent,
  ]
})
export class DashboardModule { }
