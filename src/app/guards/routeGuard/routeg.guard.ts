import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class RoutegGuard implements  CanActivate{
  constructor(private router: Router) { }      
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {      
     if (this.isLoggedIn()) {
      this.router.navigate(['/dashboard']); 
      return false;      
     }      
     // navigate to login page as user is not authenticated      
return true;      
} 
public isLoggedIn(): boolean {      
  let status = false;      
  if (localStorage.getItem('isLoggedIn') == "true") {      
     status = true;      
  }    
  else {      
     status = false;      
     }      
  return status;      
  }    
} 

