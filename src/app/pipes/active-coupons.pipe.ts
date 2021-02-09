import { Pipe, PipeTransform } from '@angular/core';
import { Coupon } from '../adminspanel/coupons/coupon';


@Pipe({
  name: 'activeCoupons',
  pure: false
})
export class ActiveCouponsPipe implements PipeTransform {

  transform(coupons: Coupon[], filt?: Coupon): Coupon[] {
    if(coupons === null) {
      return [];
    }
    else {
      const timeNow = Date.now();
      return coupons.filter(coupon=>coupon.date_of_expiration > timeNow)
    }

      

  }

}
