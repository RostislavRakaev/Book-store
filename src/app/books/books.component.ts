import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { ModalWindowComponent } from './modal-window/modal-window.component';
import { Books } from './book';
import { BasketService } from '../services/basket.service';
import { BookService } from '../services/book.service';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})


export class BooksComponent implements OnInit, OnDestroy {
  url:string = 'http://localhost:3000/api/books'; 

  books:Observable<Books[]>;
  subscriptionForBookApi:Subscription;

  basket:Books[] = [];
  basketDialogRef:MatDialogRef<ModalWindowComponent>;
  

  constructor(private bookService:BookService, public dialog: MatDialog, private basketService:BasketService) {
    this.basket = this.basketService.showBasket();
   }

  getBooksApi() {
    this.subscriptionForBookApi = this.bookService.getBooksApi().subscribe((data:any)=>{
      return this.books = data;
    })
  }

  openModal(book:Books[]) {
    this.basketDialogRef = this.dialog.open(ModalWindowComponent, {
      data: book
    });
    this.basketDialogRef.afterClosed().subscribe(result=>{
      if(result !== undefined) {
        this.basketService.addToBasket(result);
      }
    })
  }

  ngOnInit() {
    this.getBooksApi();
  }

  ngOnDestroy() {
    this.subscriptionForBookApi.unsubscribe();
  }




}

