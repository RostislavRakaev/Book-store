import { Component, OnInit } from '@angular/core';
import { BasketService } from '../services/basket.service';
import { Books } from '../books/book';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  basket:Books[] = [];
  totalPrice:number;

  constructor(private basketService:BasketService, private router:Router) { 
    this.basket = this.basketService.showBasket();
  }

  removeItemFromBasket(item):void {
    this.basketService.removeFromBasketOnlyOneItem(item);
  }

  ngOnInit(): void {  
    this.redirectIfUserIsNotLoggedIn();
  }
  ngAfterContentChecked() {
    this.totalPrice = this.basket.reduce(function(prevValue:number, item:Books):number{
      return prevValue += item.price;
    },0)
  }
  
  redirectIfUserIsNotLoggedIn() {
    if(!localStorage.getItem('token')) {
      this.router.navigate(['login']);
    }
  }

}
