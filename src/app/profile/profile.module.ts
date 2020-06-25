import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { BookService } from '../services/book.service';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../services/auth.service';
import { MatGridListModule } from '@angular/material/grid-list';



@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule
  ],
  providers: [BookService, AuthService],
  bootstrap: [ProfileComponent]
})
export class ProfileModule { }
