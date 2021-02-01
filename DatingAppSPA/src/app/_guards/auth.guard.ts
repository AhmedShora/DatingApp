import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthService } from '../_services/Auth.service';

@Injectable({
  providedIn: 'root'
})
//to guard routes
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthService,private router:Router) {      
  }
  canActivate():  boolean {
    if(this.authService.LoggedIn()){
      return true;
    }
    this.router.navigate(['/home']);
    return false;
  }
  
}
