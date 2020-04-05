import { Component, OnInit } from '@angular/core';
import { Books } from '../books/book';
import { BasketService } from '../services/basket.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  basket:Books[] = [];

  constructor(private basketService:BasketService, public authService:AuthService) {
    this.basket = this.basketService.showBasket();
   }

  ngOnInit(): void {
  }

  logout() {
    localStorage.removeItem('token');
  }
 
}
