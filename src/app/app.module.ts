import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BasketComponent } from './basket/basket.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MybooksComponent } from './mybooks/mybooks.component';
import { BooksModule } from './books/books.module';
import { BasketModule } from './basket/basket.module';
import { DateFilterPipe } from './pipes/date-filter.pipe';
import { LowToHighPipe } from './pipes/low-to-high.pipe';
import { HighToLowPipe } from './pipes/high-to-low.pipe';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MybooksComponent,
    DateFilterPipe,
    LowToHighPipe,
    HighToLowPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BooksModule,
    BasketModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
