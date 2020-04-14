import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminspanelComponent } from './adminspanel.component';
import { CouponsComponent } from './coupons/coupons.component';
import { UserListComponent } from './user-list/user-list.component';


@NgModule({
  declarations: [AdminspanelComponent, CouponsComponent, UserListComponent],
  imports: [
    CommonModule
  ],
  bootstrap: [AdminspanelComponent]
})
export class AdminspanelModule { }
