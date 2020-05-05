import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NavbarComponent } from './navbar/navbar.component';
import { BooksModule } from './books/books.module';
import { BasketModule } from './basket/basket.module';
import { LowToHighPipe } from './pipes/low-to-high.pipe';
import { HighToLowPipe } from './pipes/high-to-low.pipe';
import { BasketService } from './services/basket.service';
import { LoginRegistrationModule } from './login-registration/login-registration.module';
import { ProfileModule } from './profile/profile.module';
import { AuthService } from './services/auth.service';
import { AdminspanelModule } from './adminspanel/adminspanel.module';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LowToHighPipe,
    HighToLowPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BooksModule,
    BasketModule,
    LoginRegistrationModule,
    ProfileModule,
    AdminspanelModule
  ],
  providers: [BasketService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
