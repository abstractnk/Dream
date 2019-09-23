import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  
//import { AuthService } from '../services/auth.service'; 

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent implements OnInit {

  //constructor(private router: Router, private authService: AuthService) { }
  constructor() { }

  ngOnInit() {
  }
  // logout() {  
  //   console.log('logout');  
  //   this.authService.logout();  
  //   this.router.navigate(['/login']);  
  // }

}
