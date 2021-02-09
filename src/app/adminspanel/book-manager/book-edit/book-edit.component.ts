import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { SearchService } from 'src/app/services/search.service';
import { Books } from 'src/app/books/book';
import { BookService } from 'src/app/services/book.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit, OnDestroy {

  searchAuthors$ = new Subject<string>();
  authors$;
  
  subscriptionForAuthor$: Subscription;
  subscriptionForBookDetailsToEdit$: Subscription;

  newBook: Books = {
    title: '',
    genre: '',
    author: '',
    language: '',
    description: '',
    image_url: '',
    price: 0,
    quantity: 0,
    isNew: true
  }

  constructor(private searchService: SearchService, private bookService: BookService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.authorSearcher();
    this.getBookDetailsFromQueryToEdit();
  }
  ngOnDestroy(): void {
    this.subscriptionForAuthor$.unsubscribe();
    this.subscriptionForBookDetailsToEdit$.unsubscribe();
  }

  authorSearcher(): void {
    this.subscriptionForAuthor$ = this.searchService.searchAuthor(this.searchAuthors$).subscribe(res=>{
      this.authors$ = res;
    })
  }

  chosenAuthor(chosenAuthor): void {
    this.authors$ = '';
    this.newBook.author = chosenAuthor.name;
  }

  getBookDetailsFromQueryToEdit(): void {
      this.subscriptionForBookDetailsToEdit$ = this.activatedRoute.queryParams.subscribe((data:any)=>{
          if(data.JSONbook) {
            let parsedData = JSON.parse(data.JSONbook);
            this.newBook = parsedData;
          }
 
        
      })
  

  }
  saveBook(): void {
    if(this.newBook.isNew === true) {
      this.bookService.addBook(this.newBook).subscribe(data=>{
        if(data) this.router.navigate(['adminspanel/book-manager']);
      });
    }
    else {
      this.bookService.updateBook(this.newBook._id, this.newBook).subscribe(data=>{
        if(data) this.router.navigate(['adminspanel/book-manager']);
      });
    }

  }

}
