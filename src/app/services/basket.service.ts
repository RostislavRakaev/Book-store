import { Injectable } from '@angular/core';
import { Books } from '../books/book';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  basket:Books[] = [];

  constructor() { }

  showBasket():Books[] {
    return this.basket
  }

  addToBasket(book):void {
    this.basket.push(book);
  }

  removeFromBasketOnlyOneItem(item):void {
    for(let i = 0; i < this.basket.length; i++) {
      if(this.basket[i] === item) {
          this.basket.splice(i, 1);
          break
      }
    }
  }

  clearTheBasket() {
    this.basket = [];
    return this.basket;
  }
}
