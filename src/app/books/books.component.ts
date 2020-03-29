import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Observable, Subscription } from 'rxjs';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ModalWindowComponent } from './modal-window/modal-window.component';
import { Books } from './book';
import { BasketService } from '../services/basket.service';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})


export class BooksComponent implements OnInit, OnDestroy {
  url:string = '../assets/books.json'; 

  books:Observable<Books[]>;
  subscriptionForBookApi:Subscription;

  basket:Books[] = [];
  basketDialogRef:MatDialogRef<ModalWindowComponent>;
  

  constructor(private httpService:HttpService, public dialog: MatDialog, private basketService:BasketService) {
    this.basket = this.basketService.showBasket();
   }

  getBooksApi() {
    this.subscriptionForBookApi = this.httpService.getBooks(this.url).subscribe((data:any)=>{
      return this.books = data.books;
    })
    return this.subscriptionForBookApi;
  }

  openModal(book:Books[]) {
    this.basketDialogRef = this.dialog.open(ModalWindowComponent, {
      data: book
    });
    this.basketDialogRef.afterClosed().subscribe(result=>{
      if(result !== undefined) {
        this.basketService.addToBasket(result);
        console.log(this.basket)
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

