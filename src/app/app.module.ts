import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthGuard } from './guards/authGuard/auth.guard'; 
import { ApolloModule, APOLLO_OPTIONS } from "apollo-angular";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import { HttpClientModule } from '@angular/common/http'; // import for HTTPclient - added by Nanda
import { RoutegGuard } from './guards/routeGuard/routeg.guard';


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
    ApolloModule,
    HttpLinkModule,
    DashboardModule
  ],
  providers: [AuthGuard, RoutegGuard , 
    {
    provide: APOLLO_OPTIONS,
    useFactory: (httpLink: HttpLink) => {
      return {
        cache: new InMemoryCache(),
        link: httpLink.create({
          uri: "http://127.0.0.1:8000/graphql/"
        })
      }
    },
    deps: [HttpLink]
  }       ],
  bootstrap: [AppComponent]
})
export class AppModule { }
