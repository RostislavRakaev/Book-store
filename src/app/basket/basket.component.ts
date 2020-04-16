import { Component, OnInit } from '@angular/core';
import { BasketService } from '../services/basket.service';
import { Books } from '../books/book';
import { Router } from '@angular/router';
import { BookService } from '../services/book.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  basket:Books[] = [];
  totalPrice:number;

  constructor(private basketService:BasketService, private router:Router, private bookService:BookService, private _auth:AuthService) { 
    this.basket = this.basketService.showBasket();
  }

  removeItemFromBasket(item):void {
    this.basketService.removeFromBasketOnlyOneItem(item);
  }

  ngOnInit(): void {  
    this.redirectIfUserIsNotLoggedIn();
    console.log(this.basket)
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

  purchase():void {
    let userId = this._auth.getDecoded()._id;
    this.bookService.purchaseBook(userId, this.basket).subscribe(res=>{
      if(res) {
        this.router.navigate(['basket-success']); 
      }
    });
    
  }

}
