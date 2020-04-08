import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { BasketComponent } from './basket/basket.component';
import { LoginComponent } from './login-registration/login/login.component';
import { RegistrationComponent } from './login-registration/registration/registration.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminspanelComponent } from './adminspanel/adminspanel.component';
import { NewbookComponent } from './adminspanel/newbook/newbook.component';
import { CouponsComponent } from './adminspanel/coupons/coupons.component';


const adminsRoutes:Routes = [
  {path: 'newbook', component: NewbookComponent},
  {path: 'coupons', component: CouponsComponent}
]

const routes: Routes = [
  {path: '', component: BooksComponent},
  {path: 'basket', component: BasketComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'adminspanel', component: AdminspanelComponent, children: adminsRoutes},
  {path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
