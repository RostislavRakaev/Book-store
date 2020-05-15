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
import {MatGridListModule} from '@angular/material/grid-list';
import { PaginationComponent } from './pagination/pagination.component';
import { PaginationService } from '../services/pagination.service';

@NgModule({
  declarations: [BooksComponent, ModalWindowComponent, SelectFilterPipe, PaginationComponent],
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
    HttpClientModule,
    MatGridListModule
  ],
  exports: [
  ],
  providers: [BookService, PaginationService],
  bootstrap: [BooksComponent]
})
export class BooksModule { }
