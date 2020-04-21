import { Injectable, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(@Inject(AuthService) private _auth:AuthService, private router:Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot, ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(localStorage.getItem('token')) {
        let role = this._auth.getDecoded().role;
        if(role === 'user') {
          return true;
        }
        else {
          this.router.navigate(['']);
          return false;
        }
      }
      else {
        this.router.navigate(['']);
        return false;
      }
      
      
  }
  
}
