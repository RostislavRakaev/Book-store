import { Component, OnInit, OnDestroy } from '@angular/core';
import { BasketService } from '../services/basket.service';
import { Books } from '../books/book';
import { Router } from '@angular/router';
import { BookService } from '../services/book.service';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit, OnDestroy  {

  basket:Books[] = [];
  totalPrice:number;

  subscriptions$: Subscription = new Subscription();

  constructor(private basketService:BasketService, private router:Router, private bookService:BookService, private _auth:AuthService) {}

  removeItemFromBasket(item):void {
    this.basketService.removeFromBasketOnlyOneItem(item);
  }

  getBooks(): void {
    this.basket = this.basketService.showBasket();
  }

  purchase():void {
    if(this.basket.length > 0) {
      let userId = this._auth.getDecoded()._id;
      this.subscriptions$.add(

        this.bookService.purchaseBook(userId, this.basket).subscribe(res=>{
          console.log(res);
          this.router.navigate(['basket-success']);
      })
      
      )
    }
    
  }

  ngOnInit(): void { 
     this.getBooks();
  }

  ngAfterContentChecked() {
    this.totalPrice = this.basket.reduce(function(prevValue:number, item:Books):number{
      return prevValue += item.price;
    },0)
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }

}
