import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {Login} from '../../interfaces/login'
import {LoginResponse} from '../../interfaces/login-response'
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {environment} from '../../../environments/environment' //import for environment variables added by nanda

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  graphqlendpoint = environment.graphqlendpoint;

  getLoginUrl() {
    return this.graphqlendpoint;
  }


  //httpOptions set Access-Control-Allow-Origin: *;

  callLoginAPI(credentials: any)
  {
    console.log(this.http.post<LoginResponse>(this.graphqlendpoint, credentials, httpOptions));
    return this.http.post<LoginResponse>(this.graphqlendpoint, credentials, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // {
  //   return this.http.get<Login>(this.configUrl , { observe: 'response' });
  // }

  private handleError(res: HttpErrorResponse | any) {
    //log something here
    return throwError (res.error || 'Server error');
  }
}
