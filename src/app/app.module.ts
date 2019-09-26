import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthGuard } from './guards/auth.guard'; 


import { HttpClientModule } from '@angular/common/http'; // import for HTTPclient - added by Nanda


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
 
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DashboardModule
  ],
  providers: [AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
