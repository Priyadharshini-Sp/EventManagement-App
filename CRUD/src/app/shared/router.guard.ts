import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {HardcodedAuthenticationService} from './hardcoded-authentication.service'
@Injectable({
  providedIn: 'root'
})
export class RouterGuard implements CanActivate {
  
  constructor(private hardcodedAuthenticationService: HardcodedAuthenticationService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(this.hardcodedAuthenticationService.IsUserLoggedIn())
      return true;
    this.router.navigate(['login']);
    return false;
  }
  
}
