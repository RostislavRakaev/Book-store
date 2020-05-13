import { Component, OnInit, OnDestroy } from '@angular/core';
import { BasketService } from '../services/basket.service';
import { Books } from '../books/book';
import { Router } from '@angular/router';
import { BookService } from '../services/book.service';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { CouponsService } from '../services/coupons.service';
import { Coupon } from '../adminspanel/coupons/coupon';
import { PersonalInfo } from './personalInfo';


@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit, OnDestroy  {

  basket: Books[] = [];
  totalPrice: number;
  currentDiscountAmount: number;

  code: string = '';
  promoCode: Coupon;

  wrongPromoCode: boolean = false;
  correctPromoCode: boolean = false;

  personalInfo: PersonalInfo = {
    first_name: '',
    last_name: '',
    email: '',
    address1: '',
    country: '',
    state: '',
    zip: '',
    address2: ''
  }

  subscriptions$: Subscription = new Subscription();

  publishableKey: string = 'pk_test_CIhHDjdjwEMY5uSJNBCKHVnF00jRHJu6FC';

  constructor(
    private basketService: BasketService, private router: Router, private bookService: BookService, 
    private _auth: AuthService, private couponService: CouponsService
    ) {
      
    }

  removeItemFromBasket(item): void {
    this.basketService.removeFromBasketOnlyOneItem(item);
  }

  getBooks(): void {
    this.basket = this.basketService.showBasket();
  }

  redeemCoupon(): void {
    
    this.subscriptions$.add(
      
      this.couponService.checkIfcouponIsAvailableAndEdit(this.code).subscribe(res=>{
        if(res === null) {
          this.wrongPromoCode = true;
        }
        else {
          this.promoCode = res;
          this.correctPromoCode = true;
        }
      })

    )
  }

  getDiscountAmount(): number {
    if(this.promoCode) {
      let discount = this.promoCode.discount / 100;
      this.currentDiscountAmount = this.totalPrice * discount;
      
      return this.currentDiscountAmount;
    }
  }

  getCurrentAmount(): number {
    return this.currentDiscountAmount;
  }


  purchase(): void {
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

  ngAfterContentChecked(): void {
    this.totalPrice = this.basket.reduce((prevValue: number, item: Books): number => prevValue += item.price, 0);


    if(this.getDiscountAmount() !== undefined) {
      this.totalPrice -= this.getDiscountAmount();
    }

  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }

}
