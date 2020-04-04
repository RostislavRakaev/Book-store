import { Component, OnInit } from '@angular/core';
import { Books } from '../books/book';
import { BasketService } from '../services/basket.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  basket:Books[] = [];

  constructor(private basketService:BasketService) {
    this.basket = this.basketService.showBasket()
   }

  ngOnInit(): void {
  }

}
