import { Component, OnInit, Inject, OnDestroy, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { Observable, Subscription, fromEvent, from, Subject } from 'rxjs';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { ModalWindowComponent } from './modal-window/modal-window.component';
import { Books } from './book';
import { BookService } from '../services/book.service';
import { SearchService } from '../services/search.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';


interface Pager {
  pages: [];
  currentPage: number;
  totalPages: number;
}

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

  pager: Pager;
  pagedBooks = [];
  
  constructor(private bookService: BookService, public dialog: MatDialog, private searchService: SearchService, private route: ActivatedRoute) {}

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
          this.pagedBooks = data;
        }
      })

    )
  }

  loadPage(page: number): void {
    this.subscriptions$.add(
      this.bookService.getPaginatedBooks(page).subscribe(x => {
        this.pager = x.pager;
        this.pagedBooks = x.pageOfItems;
    })
    )

  }

  getPagedBooks(): void {
    this.subscriptions$.add(
      this.route.queryParams.subscribe(x => this.loadPage(x.page || 1))
    )
  }
  
  ngOnInit(): void {
    this.getPagedBooks();
    this.searcher();
  }


  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }




}

