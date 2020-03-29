import { Component, OnInit } from '@angular/core';
import { BasketService } from '../services/basket.service';

@Component({
  selector: 'app-mybooks',
  templateUrl: './mybooks.component.html',
  styleUrls: ['./mybooks.component.scss']
})
export class MybooksComponent implements OnInit {

  basket = [];

  constructor(private basketService:BasketService) {
    this.basket = this.basketService.showBasket();
   }

  ngOnInit(): void {
  }

}
