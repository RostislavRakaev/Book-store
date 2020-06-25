import { Injectable } from '@angular/core';
import { Books } from '../books/book';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  basket: Books[] = [];
  totalPrice: number;

  paymentUrl: string = 'https://book-server-api.herokuapp.com/payment/charge';
  url: string = 'https://book-server-api.herokuapp.com/api';

  constructor(private http: HttpClient) { }

  showBasket(): Books[] {
    return this.basket
  }

  getBasketLength(): number {
    return this.basket.length;
  }

  addToBasket(book): void {
    this.basket.push(book);
  }

  removeFromBasketOnlyOneItem(item): void {
    for (let i = 0; i < this.basket.length; i++) {
      if (this.basket[i] === item) {
        this.basket.splice(i, 1);
        break
      }
    }
  }

  clearTheBasket() {
    this.basket = [];
    return [];
  }

  getTotaPrice(): number {
    return this.basket.reduce((prevValue: number, item: Books): number => prevValue += item.price, 0);
  }

  getTotalPriceWithDiscount(): number {
    return this.totalPrice;
  }
  getAppliedDiscount(disc: number): void {
    this.totalPrice = this.getTotaPrice();
    this.totalPrice -= disc;
  }

  submitPayment(): Observable<any> {
    return this.http.post(this.paymentUrl, { amount: this.getTotalPriceWithDiscount() });
  }

  purchase(userId: number, bookId: Books[]): Observable<Books[]> {
    return this.http.put<Books[]>(`${this.url}/users/${userId}/books`, bookId);
  }
}
