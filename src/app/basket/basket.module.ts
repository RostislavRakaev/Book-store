import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketComponent } from './basket.component';
import { BasketService } from '../services/basket.service';
import { BasketSuccessComponent } from './basket-success/basket-success.component';
import { BookService } from '../services/book.service';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CheckoutComponent } from './checkout/checkout.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [BasketComponent, BasketSuccessComponent, CheckoutComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatGridListModule,
    MatCardModule
  ],
  providers: [BasketService, BookService, AuthService],
  bootstrap: [BasketComponent]
})
export class BasketModule { }
