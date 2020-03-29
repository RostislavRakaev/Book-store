import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketComponent } from './basket.component';
import { BasketService } from '../services/basket.service';
import { BooksModule } from '../books/books.module';



@NgModule({
  declarations: [BasketComponent],
  imports: [
    CommonModule
  ],
  providers: [BasketService],
  bootstrap: [BasketComponent]
})
export class BasketModule { }
