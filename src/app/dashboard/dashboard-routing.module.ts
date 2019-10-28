import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShellComponent } from './shell/shell.component';
import { AuthGuard } from '../guards/authGuard/auth.guard';    //importing route guard - added by Nanda
import { HomeComponent } from './home/home.component';
import { AddproductComponent } from '../dashboard/addproduct/addproduct.component'

const routes: Routes = [
  {path: 'dashboard',component: ShellComponent, canActivate : [AuthGuard],
  children: [
            {path: '',component: HomeComponent, canActivate : [AuthGuard]},
            {path: 'addproduct',component: AddproductComponent, canActivate : [AuthGuard]}

            ]},
  {path: '**', redirectTo: '/'}     //wildcard route - added by Nanda
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
