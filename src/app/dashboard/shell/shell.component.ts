import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  
import { AuthService } from '../../services/authService/auth.service';  

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent implements OnInit {

  constructor(private _router: Router, private authService: AuthService) { }
  //constructor() { }

  ngOnInit() {
    this._router.navigate(['/dashboard/']);
  }
  logout() {  
    console.log('logout');  
    this.authService.logout();  
    this._router.navigate(['/login']);  
  }

  getUser(): any {
    return localStorage.getItem('token');
}

}
