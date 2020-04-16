import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketComponent } from './basket.component';
import { BasketService } from '../services/basket.service';
import { BasketSuccessComponent } from './basket-success/basket-success.component';
import { BookService } from '../services/book.service';
import { AuthService } from '../services/auth.service';



@NgModule({
  declarations: [BasketComponent, BasketSuccessComponent],
  imports: [
    CommonModule
  ],
  providers: [BasketService, BookService, AuthService],
  bootstrap: [BasketComponent]
})
export class BasketModule { }
