import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Observable, Subscription, fromEvent, from, Subject } from 'rxjs';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { ModalWindowComponent } from './modal-window/modal-window.component';
import { Books } from './book';
import { BookService } from '../services/book.service';
import { SearchService } from '../services/search.service';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})


export class BooksComponent implements OnInit, OnDestroy {
  url:string = 'http://localhost:3000/api/books'; 


  books:Observable<Books[]>;

  searchBooks$ = new Subject<string>();
  books$;
  subscriptionForBookApi:Subscription;
  subscriptionForSearcher: Subscription;

  basketDialogRef:MatDialogRef<ModalWindowComponent>;
  
  constructor(private bookService: BookService, public dialog: MatDialog, private searchService: SearchService) {}

  getBooksApi() {
    this.subscriptionForBookApi = this.bookService.getBooksApi().subscribe((data:any)=>{
      return this.books = data;
    })
  }

  openModal(book:Books[]) {
    this.basketDialogRef = this.dialog.open(ModalWindowComponent, {
      data: book
    });
  }
  bookSearcher() {
    this.subscriptionForSearcher = this.searchService.search(this.searchBooks$).subscribe(response=>{
      this.books$ = response;
    })
  }

  ngOnInit() {
    this.getBooksApi();
    this.bookSearcher();
  }

  ngOnDestroy() {
    this.subscriptionForBookApi.unsubscribe();
    this.subscriptionForSearcher.unsubscribe();
  }




}

