import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl , FormBuilder , Validators} from '@angular/forms';
import { Router } from '@angular/router';

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
 

  constructor(private loginFormBuilder: FormBuilder ,private _router: Router) { }

  ngOnInit() {

    this.isloginpage=true;

    this.loginForm = this.loginFormBuilder.group({
      emailid: ['',[Validators.required, Validators.email]],
      password: ['',Validators.required],
    })
    
  }

  //get loginFormControl() { return this.loginForm.controls; }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.loginForm.value);
    this._router.navigate(['dashboard']);
  }

}
