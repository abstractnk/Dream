import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Link1Component } from './link1/link1.component';
import { ShellComponent } from './shell/shell.component';



const routes: Routes = [
  {path: 'dashboard',component: ShellComponent,
  children: [{path: 'linksa',component: Link1Component}]},
  {path: '**', redirectTo: '/'}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
