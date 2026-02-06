import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PermissionserviceService {

  
    constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const userRole = JSON.parse(localStorage.getItem('userRole') || '{}');
    const allowedRoles = route.data['roles'];
    const requiredPermission = route.data['permission'];

    // check role
    if (allowedRoles && !allowedRoles.includes(userRole.role)) {
      this.router.navigate(['/unauthorized']);
      return false;
    }

    // check permission
    if (requiredPermission && !userRole.permissions?.includes(requiredPermission)) {
      this.router.navigate(['/unauthorized']);
      return false;
    }

    return true;
  }


}
