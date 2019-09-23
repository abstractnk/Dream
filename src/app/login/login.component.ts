import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl , FormBuilder , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'  
import { Login } from 'src/app/interfaces/login';  


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // loginForm = new FormGroup({
  //   emailid : new FormControl(''),
  //   password : new FormControl(''),
  // });

  loginForm : FormGroup;
  isloginpage :boolean = true;
  // loginForm = this.loginFormBuilder.group({
  //   emailid: ['',Validators.required],
  //   password: ['',Validators.required],
  // });

  // emailid= new FormControl('');
  // password= new FormControl('');
 

  constructor(private loginFormBuilder: FormBuilder ,private _router: Router, private authService : AuthService ) { }
  model: Login = { userid: "admin@c.v", password: "admin@123" }   
  message: string;  
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
       if (this.f.userid.value == this.model.userid && this.f.password.value == this.model.password) {  
       console.log("Login successful");  
       //this.authService.authLogin(this.model);  
       localStorage.setItem('isLoggedIn', "true");  
       localStorage.setItem('token', this.f.userid.value);  
       this._router.navigate([this.returnUrl]);  
       }  
    else {  
       this.message = "Please check your userid and password";  
       }  
      }  
   }

  //onSubmit() {
    // TODO: Use EventEmitter with form value
    //console.log(this.loginForm.value);
    //this._router.navigate(['dashboard']);
  //}

}
