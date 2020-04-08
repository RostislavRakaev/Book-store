import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminspanelComponent } from './adminspanel.component';
import { NewbookComponent } from './newbook/newbook.component';
import { CouponsComponent } from './coupons/coupons.component';



@NgModule({
  declarations: [AdminspanelComponent, NewbookComponent, CouponsComponent],
  imports: [
    CommonModule
  ]
})
export class AdminspanelModule { }
