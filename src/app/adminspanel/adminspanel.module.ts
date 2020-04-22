import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminspanelComponent } from './adminspanel.component';
import { CouponsComponent } from './coupons/coupons.component';
import { UserListComponent } from './user-list/user-list.component';
import { AppRoutingModule } from '../app-routing.module';
import { BookManagerComponent } from './book-manager/book-manager.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AdminspanelComponent, CouponsComponent, UserListComponent, BookManagerComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule
  ],
  bootstrap: [AdminspanelComponent]
})
export class AdminspanelModule { }
