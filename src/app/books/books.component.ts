import { Component, OnInit, Inject, OnDestroy, ViewChild, ElementRef, OnChanges } from '@angular/core';
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

  selectedCategory;

  searchBooks$ = new Subject<string>();
  books$: Books[];

  subscriptions$: Subscription = new Subscription();

  basketDialogRef: MatDialogRef<ModalWindowComponent>;
  
  constructor(private bookService: BookService, public dialog: MatDialog, private searchService: SearchService) {}

  getBooksApi(): void {
    this.subscriptions$.add(
      this.bookService.getBooksApi().subscribe(res=>this.books$ = res)
    )
  }

  openModal(book: Books[]): void {
    this.basketDialogRef = this.dialog.open(ModalWindowComponent, {
      data: book
    });
  }

  searcher(): void {

    this.subscriptions$.add(
      this.searchService.searchBook(this.searchBooks$).subscribe(data=>{
        if(data) {
          this.books$ = data;
        }
      })

    )
  }


  ngOnInit(): void {
    
    this.getBooksApi();
    this.searcher();
  }


  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }




}

