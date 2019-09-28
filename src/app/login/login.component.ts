import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl , FormBuilder , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/authService/auth.service'  
import { Login } from 'src/app/interfaces/login';
import { LoginService } from '../services/loginService/login.service'   //importing login service - added by Nanda
import { LoginResponse } from 'src/app/interfaces/login-response'; //importing login response interface - added by Nanda

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  isloginpage :boolean = true;

  constructor(private loginFormBuilder: FormBuilder ,private _router: Router, private authService : AuthService, private loginService : LoginService ) { }
  model: Login = { userid: "admin@c.v", password: "admin@123" }   
  message: string;  
  returnUrl: string;
  loginresp : LoginResponse; // object to hold login-api response - added by Nanda
  headers : any; // object to hold login-api response header- added by Nanda
  error : any // object to hold login-api response error- added by Nanda
  credentials : any // object to hold login credentials for request- added by Nanda
  ngOnInit() {

    this.isloginpage=true;

    this.loginForm = this.loginFormBuilder.group({
      userid: ['',[Validators.required, Validators.email]],
      password: ['',Validators.required],
    })
    this.returnUrl = 'dashboard';  
   this.authService.logout();
  }

  //get loginFormControl() { return this.loginForm.controls; }
  get f() { return this.loginForm.controls; } 
  
  login() {  
  
    // stop here if form is invalid  
    if (this.loginForm.invalid) {  
       return;  
    }  
    else { 
      
      //Subscibing to login api from login service - added by Nanda
      
      this.credentials = {
        "username": this.f.userid.value,
        "password": this.f.password.value,
    }

      this.loginService.callLoginAPI(this.credentials).subscribe(
        resp => { 
          this.loginresp = { 
            refresh: resp.refresh,
            access: resp.access,
            detail: resp.detail };
                }, //next ftn arrow ftn implementation added by Nanda
        err => {
          console.log(err);
          console.log(this.loginresp.detail);
              },  //error ftn arrow ftn implementation added by Nanda
        () => {
          console.log(this.loginresp.refresh);
          console.log(this.loginresp.access);
          console.log("Login successful");
          localStorage.setItem('isLoggedIn', "true");  
          localStorage.setItem('token', this.f.userid.value);  
          //added by ashiq for tokem implementation
          this.authService.doLoginUser(this.f.userid.value, this.loginresp);
          this._router.navigate([this.returnUrl]);   
              },  //complete ftn arrow ftn implementation added by Nanda
      );
      }  
   }

}
