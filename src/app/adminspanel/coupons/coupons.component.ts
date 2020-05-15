import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { CouponsService } from 'src/app/services/coupons.service';
import { Subscription, Observable } from 'rxjs';
import { Coupon } from './coupon';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.scss']
})
export class CouponsComponent implements OnInit, OnDestroy {

  newCouponToggler: boolean = false;

  subscriptions$: Subscription = new Subscription();

  coupons: Observable<Coupon[]>;

  constructor(private couponService: CouponsService) { }

  toggle(): void {
    this.newCouponToggler = !this.newCouponToggler;
  }

  getCoupons(): void {
    this.coupons = this.couponService.getCoupons();
  }

  deleteCoupon(coupon: Coupon): void {
    this.subscriptions$.add(

      this.couponService.deleteCoupon(coupon).subscribe()

    )
  }

  ngOnInit(): void {
    this.getCoupons();
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }

}
