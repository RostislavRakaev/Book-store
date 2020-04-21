import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { BasketComponent } from './basket/basket.component';
import { LoginComponent } from './login-registration/login/login.component';
import { RegistrationComponent } from './login-registration/registration/registration.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminspanelComponent } from './adminspanel/adminspanel.component';
import { CouponsComponent } from './adminspanel/coupons/coupons.component';
import { AuthGuard } from './guards/auth.guard';
import { BookManagerComponent } from './adminspanel/book-manager/book-manager.component';
import { UserListComponent } from './adminspanel/user-list/user-list.component';
import { AuthForAdminGuard } from './guards/auth-for-admin.guard';
import { BasketGuard } from './guards/basket.guard';
import { BasketSuccessComponent } from './basket/basket-success/basket-success.component';


const adminsRoutes:Routes = [
  {path: '', component: BookManagerComponent},
  {path: 'coupons', component: CouponsComponent},
  {path: 'user-list', component: UserListComponent},
  {path: '**', redirectTo: ''}
]

const routes: Routes = [
  {path: '', component: BooksComponent},
  {path: 'basket', component: BasketComponent, canActivate: [BasketGuard]},
  {path: 'basket-sucess', component: BasketSuccessComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'adminspanel', component: AdminspanelComponent, canActivate: [AuthForAdminGuard], children: adminsRoutes,},
  {path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AuthForAdminGuard, BasketGuard]
})
export class AppRoutingModule { }
