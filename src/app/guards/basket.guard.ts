import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BasketService } from '../services/basket.service';

@Injectable({
  providedIn: 'root'
})
export class BasketGuard implements CanActivate {

  constructor(private basketService: BasketService, private router: Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let token = localStorage.getItem('token');
    if (this.basketService.showBasket().length <= 0) {
      this.router.navigate(['']);
      return false;
    }
    else if (token === null) {
      this.router.navigate(['login']);
      return false
    }
    else {
      return true;
    }



  }

}
