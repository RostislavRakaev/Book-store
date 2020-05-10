import { Component, OnInit, OnDestroy } from '@angular/core';
import { BasketService } from '../services/basket.service';
import { Books } from '../books/book';
import { Router } from '@angular/router';
import { BookService } from '../services/book.service';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { CouponsService } from '../services/coupons.service';
import { Coupon } from '../adminspanel/coupons/coupon';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit, OnDestroy  {

  basket: Books[] = [];
  totalPrice: number;
  discountAmount: number;

  code: string = '';
  promoCode: Coupon;

  wrongPromoCode: boolean = false;
  correctPromoCode: boolean = false;

  subscriptions$: Subscription = new Subscription();

  constructor(private basketService: BasketService, private router: Router, private bookService: BookService, private _auth: AuthService, private couponService: CouponsService) {}

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
    let discount = this.promoCode.discount / 100;
    this.discountAmount = this.totalPrice * discount;
    return this.discountAmount;
  }

  onTotalAmountChange(): number {
      return this.totalPrice -= this.discountAmount
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
     this.totalPrice = this.basket.reduce((prevValue: number, item: Books): number => {
      return prevValue += item.price;
    },0);

    if(this.discountAmount !== undefined) { 
      this.totalPrice -= this.discountAmount
    }
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }

}
