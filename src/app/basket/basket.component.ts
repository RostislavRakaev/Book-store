import { Component, OnInit } from '@angular/core';
import { BasketService } from '../services/basket.service';
import { Books } from '../books/book';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  basket:Books[] = [];

  constructor(private basketService:BasketService) { 
    this.basket = this.basketService.showBasket();
  }

  removeItemFromBasket(item):void {
    this.basketService.removeFromBasketOnlyOneItem(item);
  }

  ngOnInit(): void {
  }

}
