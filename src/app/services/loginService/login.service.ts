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

  loginurl = environment.login_api_url;

  getLoginUrl() {
    return this.loginurl;
  }


  //httpOptions set Access-Control-Allow-Origin: *;

  callLoginAPI(credentials: Login)
  {
    return this.http.post<LoginResponse>(this.loginurl, credentials, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // {
  //   return this.http.get<Login>(this.configUrl , { observe: 'response' });
  // }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return throwError (res.error || 'Server error');
  }
}
