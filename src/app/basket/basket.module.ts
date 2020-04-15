import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketComponent } from './basket.component';
import { BasketService } from '../services/basket.service';
import { BooksModule } from '../books/books.module';
import { BasketSuccessComponent } from './basket-success/basket-success.component';



@NgModule({
  declarations: [BasketComponent, BasketSuccessComponent],
  imports: [
    CommonModule
  ],
  providers: [BasketService],
  bootstrap: [BasketComponent]
})
export class BasketModule { }
