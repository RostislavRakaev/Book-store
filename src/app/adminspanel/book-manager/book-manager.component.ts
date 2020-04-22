import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { SearchService } from 'src/app/services/search.service';
import { Books } from 'src/app/books/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-manager',
  templateUrl: './book-manager.component.html',
  styleUrls: ['./book-manager.component.scss']
})
export class BookManagerComponent implements OnInit, OnDestroy {

  searchAuthors$ = new Subject<string>();
  authors$;
  
  subscriptionForAuthor$: Subscription;

  newBook: Books = {
    title: '',
    genre: '',
    author: '',
    language: '',
    description: '',
    image_url: '',
    price: 0,
    quantity: 0
  }
  authorsId = '';

  constructor(private searchService: SearchService, private bookService: BookService) { }

  ngOnInit(): void {
    this.authorSearcher();
  }
  ngOnDestroy():void {
    this.subscriptionForAuthor$.unsubscribe;
  }

  authorSearcher():void {
    this.subscriptionForAuthor$ = this.searchService.searchAuthor(this.searchAuthors$).subscribe(res=>{
      this.authors$ = res;
    })
  }

  chosenAuthor(chosenAuthor):void {
    this.authors$ = '';
    this.authorsId = chosenAuthor.name;
    this.newBook.author = chosenAuthor._id;
  }
  saveBook():void {
    this.bookService.addBook(this.newBook);
  }

}
