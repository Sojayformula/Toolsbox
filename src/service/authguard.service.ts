import { Injectable } from '@angular/core';
import { Router, CanActivate, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate{


   constructor(private authService: AuthService, private router: Router) {}

  canActivate(){
    if (this.authService.isLoggedIn()) {
      return true;
    }

    this.router.navigate(['/signin']);
    return false;
  }
  //  canActivate(): boolean{
  //     if (this.authService.isLoggedIn()) {
  //       return true; 
  //     } else {
  //       this.router.navigate(['/signin']);
  //       return false;
  //     }
  //   }
// }

}
