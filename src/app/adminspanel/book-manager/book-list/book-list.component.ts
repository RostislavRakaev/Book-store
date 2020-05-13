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

  subscriptions$: Subscription = new Subscription();

  books: Books[];
  constructor(private bookService: BookService, private router: Router) { }

  getBooks(): void {
    this.subscriptions$.add(

      this.bookService.getBooksApi().subscribe(data=>this.books = data)

    )
  }

  deleteBook(id): void {
    this.subscriptions$.add(
      
      this.bookService.deleteBook(id).subscribe()

    )
  }

  editBook(book): void {
    book.isNew = false;
    let JSONbook = JSON.stringify(book);
    this.router.navigate(['adminspanel/book-manager/edit'], {queryParams: { JSONbook }});
  }

  ngOnInit(): void {
    this.getBooks();
  }
  
  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
