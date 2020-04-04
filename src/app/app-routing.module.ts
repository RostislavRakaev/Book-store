import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { BasketComponent } from './basket/basket.component';
import { LoginComponent } from './login-registration/login/login.component';
import { RegistrationComponent } from './login-registration/registration/registration.component';




const routes: Routes = [
  {path: '', component: BooksComponent},
  {path: 'basket', component: BasketComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
