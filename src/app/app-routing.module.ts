import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ShellComponent } from './dashboard/shell/shell.component'; 
import { AuthGuard } from './guards/auth.guard';



const routes: Routes = [
  {path: '',component: LoginComponent},
  { path: 'login', component: LoginComponent },  
  { path: 'dashboard', component: ShellComponent, canActivate : [AuthGuard] }  

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    { enableTracing: true } // <-- debugging purposes only)
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
