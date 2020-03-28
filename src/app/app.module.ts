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



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MybooksComponent
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
