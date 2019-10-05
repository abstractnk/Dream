import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Link1Component } from './link1/link1.component';
import { ShellComponent } from './shell/shell.component';
import { AuthGuard } from '../guards/authGuard/auth.guard';    //importing route guard - added by Nanda

const routes: Routes = [
  {path: 'dashboard',component: ShellComponent, canActivate : [AuthGuard],
  children: [
            {path: '',component: Link1Component, canActivate : [AuthGuard]}

            ]},
  {path: '**', redirectTo: '/'}     //wildcard route - added by Nanda
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
