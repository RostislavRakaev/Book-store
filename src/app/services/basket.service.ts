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

  paymentUrl: string = 'http://localhost:3000/payment/charge';
  url: string = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  showBasket(): Books[] {
    return this.basket
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
    return [];
  }

  purchase(userId: number, bookId: Books[]): Observable<Books[]> {
    return this.http.put<Books[]>(`${this.url}/users/${userId}/books`, bookId);
  }

  getTotaPrice(): number {
    return this.basket.reduce((prevValue: number, item: Books): number => prevValue += item.price, 0);
  }

  submitPayment(): Observable<any> {
    return this.http.post(this.paymentUrl, { amount: this.getTotaPrice() });
  }
}
