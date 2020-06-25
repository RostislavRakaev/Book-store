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
export class BasketComponent implements OnInit, OnDestroy {

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
    protected basketService: BasketService, private router: Router, private bookService: BookService,
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

      this.couponService.checkIfcouponIsAvailableAndEdit(this.code).subscribe(
        res => {
          this.promoCode = res;
          this.correctPromoCode = true;
        },
        err => {
          this.wrongPromoCode = true;
          setTimeout(() => this.wrongPromoCode = false, 1500);
        }
      )

    )
  }

  getDiscountAmount(): number {
    if (this.promoCode) {
      let discount = this.promoCode.discount / 100;
      this.currentDiscountAmount = this.totalPrice * discount;

      return this.currentDiscountAmount;
    }
  }

  getCurrentAmount(): number {
    return this.currentDiscountAmount;
  }

  ngOnInit(): void {
    this.getBooks();

  }

  ngAfterContentChecked(): void {
    this.totalPrice = this.basketService.getTotaPrice();


    if (this.getDiscountAmount() !== undefined) {
      this.totalPrice -= this.getDiscountAmount();
    }

    if (this.basketService.showBasket().length <= 0) this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }

}
