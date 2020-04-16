import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BasketService } from '../services/basket.service';

@Injectable({
  providedIn: 'root'
})
export class BasketGuard implements CanActivate {

  basket;
  constructor(private basketService:BasketService, private router:Router) {
    this.basket = this.basketService.showBasket();
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.basket.length > 0) {
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
  
}
