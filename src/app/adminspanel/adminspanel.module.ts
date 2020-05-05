import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminspanelComponent } from './adminspanel.component';
import { CouponsComponent } from './coupons/coupons.component';
import { UserListComponent } from './user-list/user-list.component';
import { AppRoutingModule } from '../app-routing.module';
import { BookManagerComponent } from './book-manager/book-manager.component';
import { FormsModule } from '@angular/forms';
import { BookListComponent } from './book-manager/book-list/book-list.component';
import { BookEditComponent } from './book-manager/book-edit/book-edit.component';
import { BookService } from '../services/book.service';
import { SearchService } from '../services/search.service';
import { AuthorsComponent } from './authors/authors.component';
import { AuthorListComponent } from './authors/author-list/author-list.component';
import { AuthorEditComponent } from './authors/author-edit/author-edit.component';
import { AuthorService } from '../services/author.service';
import { UserService } from '../services/user.service';
import { AdminPipe } from '../pipes/admin.pipe';
import { UserPipe } from '../pipes/user.pipe';
import { NewCouponComponent } from './coupons/new-coupon/new-coupon.component';
import { CouponsService } from '../services/coupons.service';
import { ActiveCouponsPipe } from '../pipes/active-coupons.pipe';
import { ExpiredCouponsPipe } from '../pipes/expired-coupons.pipe';

@NgModule({
  declarations: [AdminspanelComponent, CouponsComponent, UserListComponent, BookManagerComponent, BookListComponent, BookEditComponent, AuthorsComponent, AuthorListComponent, AuthorEditComponent, UserPipe, AdminPipe, NewCouponComponent, ActiveCouponsPipe, ExpiredCouponsPipe],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [BookService, SearchService, AuthorService, UserService, CouponsService],
  bootstrap: [AdminspanelComponent]
})
export class AdminspanelModule { }
