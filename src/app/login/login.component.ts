import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl , FormBuilder , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/authService/auth.service'  
import { Login } from 'src/app/interfaces/login';
import { LoginService } from '../services/loginService/login.service'   //importing login service - added by Nanda
import { LoginResponse } from 'src/app/interfaces/login-response'; //importing login response interface - added by Nanda
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import { all } from 'q';

const tokenAuth = gql`
  mutation tokenAuth($username: String!,$password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  isloginpage :boolean = true;
  auth_fail_flag = false;    //flag to show login failed message in login page - added by Nanda
  server_error_flag = false;    //flag to show login failed message in login page - added by Nanda
  user_token : string;      //variable to hold jwt token - graphql
  data : any;
  errors : any;
  constructor(private loginFormBuilder: FormBuilder ,private _router: Router, private authService : AuthService, private loginService : LoginService,private apollo: Apollo ) { } 
  returnUrl: string;
  
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
    this.apollo.mutate({
      mutation: tokenAuth,
      variables: {
        username: this.f.userid.value,
        password : this.f.password.value
      },
      errorPolicy : "all",
    }).subscribe(
      ({data,errors,context,extensions}) => {
      this.data=data;
      this.errors = errors;
    },(error) => {
      console.log('there was an error sending the query', error);
      this.server_error_flag=true;
              setTimeout(() => {
                this.server_error_flag=false;
              }, 3000);
    },
    ()=>{
      if (null != this.data["tokenAuth"])
          {
            console.log(">>>>>> "+ this.data["tokenAuth"]["token"])
            localStorage.setItem('isLoggedIn', "true");  
            localStorage.setItem('token', this.data["tokenAuth"]["token"]);  
            // this.authService.doLoginUser(this.user_token, this.loginresp);
            this._router.navigate([this.returnUrl]);   
          }
      else
          {
            console.log("------ "+ this.errors[0]["message"])
            if("Please, enter valid credentials" == this.errors[0]["message"])
            {
              this.auth_fail_flag=true;
              setTimeout(() => {
                this.auth_fail_flag=false;
              }, 3000);
            }
            else
            {
              this.server_error_flag=true;
              setTimeout(() => {
                this.server_error_flag=false;
              }, 3000);
            }
          }

    }
    
    );  
   }

  }
}
