import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coupon } from '../adminspanel/coupons/coupon'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CouponsService {

  url: string = 'http://localhost:3000/api/coupons';

  constructor(private http: HttpClient) { }

  getCoupons(): Observable<Coupon[]>{
    return this.http.get<Coupon[]>(this.url);
  }

  saveCoupon(coupon: Coupon): Observable<Coupon> {
    return this.http.post<Coupon>(this.url, coupon);
  }

  checkIfcouponIsAvailableAndEdit(couponName: string): Observable<any> {
    return this.http.get<any>(`${this.url}-check?code=${couponName}`);
  }

  deleteCoupon(coupon: Coupon): Observable<Coupon> {
    return this.http.delete<Coupon>(`${this.url}/${coupon._id}`)
  }
}
