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
import { BookEditComponent } from './adminspanel/book-manager/book-edit/book-edit.component';
import { BookListComponent } from './adminspanel/book-manager/book-list/book-list.component';
import { AuthorsComponent } from './adminspanel/authors/authors.component';
import { AuthorListComponent } from './adminspanel/authors/author-list/author-list.component';
import { AuthorEditComponent } from './adminspanel/authors/author-edit/author-edit.component';



const adminBookRoutes:Routes = [
  {path: '', component: BookListComponent},
  {path: 'edit', component: BookEditComponent},
  {path: '**', redirectTo: ''}
]
const authorsRoutes:Routes = [
  {path: '', component: AuthorListComponent},
  {path: 'edit', component: AuthorEditComponent},
  {path: '**', redirectTo: ''}
]
const adminsRoutes:Routes = [
  {path: '', component: UserListComponent},
  {path: 'coupons', component: CouponsComponent},
  {path: 'book-manager', component: BookManagerComponent, children: adminBookRoutes},
  {path: 'authors', component: AuthorsComponent, children: authorsRoutes},
  {path: '**', redirectTo: ''}
]

const routes: Routes = [
  {path: '', component: BooksComponent},
  {path: 'basket', component: BasketComponent, canActivate: [BasketGuard]},
  {path: 'basket-sucess', component: BasketSuccessComponent, canActivate: [BasketGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'adminspanel', component: AdminspanelComponent,canActivate: [AuthForAdminGuard], children: adminsRoutes },
  {path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AuthForAdminGuard, BasketGuard]
})
export class AppRoutingModule { }
