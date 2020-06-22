import { Component, OnInit, Inject, OnDestroy, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { Observable, Subscription, fromEvent, from, Subject } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalWindowComponent } from './modal-window/modal-window.component';
import { Books } from './book';
import { BookService } from '../services/book.service';
import { SearchService } from '../services/search.service';
import { ActivatedRoute } from '@angular/router';



interface Pager {
  currentPage: number;
  totalPages: number;
  pages: [];
}

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})

export class BooksComponent implements OnInit, OnDestroy {

  breakpoint: number = 3;

  selectedCategory;
  selectedBookId: number;

  searchBooks$ = new Subject<string>();
  books$: Books[];

  subscriptions$: Subscription = new Subscription();

  basketDialogRef: MatDialogRef<ModalWindowComponent>;

  pager: Pager;
  pagedBooks = [];

  constructor(private bookService: BookService, public dialog: MatDialog, private searchService: SearchService, private route: ActivatedRoute) {
  }

  getBooksApi(): void {
    this.subscriptions$.add(
      this.bookService.getBooksApi().subscribe(res => this.books$ = res)
    )
  }

  openModal(book: Books[], chosenId: number): void {
    this.basketDialogRef = this.dialog.open(ModalWindowComponent, {
      data: book
    });
    this.selectedBookId = chosenId;
    this.subscriptions$.add(
      this.basketDialogRef.afterClosed().subscribe(result => this.selectedBookId = result)
    );
  }

  searcher(): void {
    this.subscriptions$.add(
      this.searchService.searchBook(this.searchBooks$).subscribe(data => {
        if (data.pageOfItems) this.pagedBooks = data.pageOfItems;
        else this.pagedBooks = data;
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

  onResize(event) {
    this.breakpoint = (window.innerWidth <= 500) ? 1 : 3;
  }

  ngOnInit(): void {
    this.getPagedBooks();
    this.searcher();
    this.breakpoint = (window.innerWidth <= 500) ? 1 : 3;
  }

  ngAfterContentChecked(): void {

  }


  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }




}

