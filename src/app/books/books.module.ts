import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from '../services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { BooksComponent } from './books.component';
import { MatCardModule } from '@angular/material/card';
import { ModalWindowComponent } from './modal-window/modal-window.component';
import { MatDialogModule } from '@angular/material/dialog';
import { OverlayModule } from "@angular/cdk/overlay";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




@NgModule({
  declarations: [BooksComponent, ModalWindowComponent],
  entryComponents: [ModalWindowComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    OverlayModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  exports: [
  ],
  providers: [HttpService],
  bootstrap: [BooksComponent]
})
export class BooksModule { }
