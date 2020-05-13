import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookService } from '../services/book.service';

import { HttpClientModule } from '@angular/common/http';
import { BooksComponent } from './books.component';

import { MatCardModule } from '@angular/material/card';
import { ModalWindowComponent } from './modal-window/modal-window.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { OverlayModule } from "@angular/cdk/overlay";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms'
import { SelectFilterPipe } from '../pipes/selectFilter'





@NgModule({
  declarations: [BooksComponent, ModalWindowComponent, SelectFilterPipe],
  entryComponents: [ModalWindowComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    OverlayModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatSelectModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
  ],
  providers: [BookService],
  bootstrap: [BooksComponent]
})
export class BooksModule { }
