import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { Subscription } from 'rxjs';
import { Books } from 'src/app/books/book';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, OnDestroy {

  subscriptionForBooks$: Subscription;

  books: Books[];
  constructor(private bookService: BookService, private router: Router) { }

  ngOnInit(): void {
    this.getBooks();
  }
  
  ngOnDestroy(): void {
    this.subscriptionForBooks$.unsubscribe();
  }

  getBooks():void {
    this.subscriptionForBooks$ = this.bookService.getBooksApi().subscribe(data=>this.books = data);
  }

  deleteBook(id):void {
    this.bookService.deleteBook(id).subscribe();
  }

  editBook(book):void {
    book.author = book.author.name;
    book.isNew = false;
    let JSONbook = JSON.stringify(book);
    this.router.navigate(['adminspanel/book-manager/edit'], {queryParams: { JSONbook }});
  }
}
