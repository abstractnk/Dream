import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
//import { config } from './../../config';
import { LoginResponse } from '../../interfaces/login-response';


@Injectable({
  providedIn: 'root'
})

//modified by ashiq
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string;

  constructor(private http: HttpClient) {}


  logout() {
    localStorage.setItem('isLoggedIn','false');
    return this.http.post<any>(`https://abstractnk.pythonanywhere.com/api/token/logout`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(
      tap(() => this.doLogoutUser()),
      mapTo(true),
      catchError(error => {
        alert(error.error);
        return of(false);
      }));
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  refreshToken() {
    return this.http.post<any>(`https://abstractnk.pythonanywhere.com/api/token/refresh`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(tap((loginResponse: LoginResponse) => {
      this.storeJwtToken(loginResponse.refresh);
    }));
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  public doLoginUser(username: string, loginResponse: LoginResponse) {
    this.loggedUser = username;
    this.storeTokens(loginResponse);
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeTokens(loginResponse: LoginResponse) {
    localStorage.setItem(this.JWT_TOKEN, loginResponse.access);
    localStorage.setItem(this.REFRESH_TOKEN, loginResponse.refresh);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
}

  // constructor() { }
  // logout() :void {    
  //   localStorage.setItem('isLoggedIn','false');    
  //   localStorage.removeItem('token');    
  //   }

