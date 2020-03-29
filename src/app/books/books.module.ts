import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpService } from '../services/http.service';
import { BasketService } from '../services/basket.service'

import { HttpClientModule } from '@angular/common/http';
import { BooksComponent } from './books.component';

import { MatCardModule } from '@angular/material/card';
import { ModalWindowComponent } from './modal-window/modal-window.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { OverlayModule } from "@angular/cdk/overlay";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms'
import { BasketModule } from '../basket/basket.module';




@NgModule({
  declarations: [BooksComponent, ModalWindowComponent],
  entryComponents: [ModalWindowComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    OverlayModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatSelectModule,
    FormsModule
  ],
  exports: [
  ],
  providers: [HttpService, BasketService],
  bootstrap: [BooksComponent]
})
export class BooksModule { }
