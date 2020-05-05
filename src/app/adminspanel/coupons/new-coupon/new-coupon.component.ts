import { Component, OnInit, OnDestroy, Input, Output } from '@angular/core';
import { CouponsService } from 'src/app/services/coupons.service';
import { Subscription } from 'rxjs';
import { Coupon } from '../coupon';
import { AuthService } from 'src/app/services/auth.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-new-coupon',
  templateUrl: './new-coupon.component.html',
  styleUrls: ['./new-coupon.component.scss']
})
export class NewCouponComponent implements OnInit, OnDestroy {

  @Output('toggle') toggle: EventEmitter<any> = new EventEmitter();

  subscriptions$: Subscription = new Subscription();

  newCoupon: Coupon = {
    code: '',
    discount: 0,
    date_of_implementation: Date.now(),
    date_of_expiration: '',
    who_issued: this.authService.getDecoded()._id,
  }

  constructor(private couponService: CouponsService, private authService: AuthService) { }

  saveCoupon(): void {
    this.newCoupon.date_of_expiration = Date.parse((this.newCoupon.date_of_expiration) as string);

    this.subscriptions$.add(

      this.couponService.saveCoupon(this.newCoupon).subscribe(res=>{
        if(res) this.toggle.emit();
      })

    )
  }

  ngOnInit(): void {
  }
  
  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }

}
