import { Component, OnInit, OnDestroy } from '@angular/core';
import { Author } from '../author';
import { Subject, Subscription } from 'rxjs';
import { SearchService } from 'src/app/services/search.service';
import { AuthorService } from 'src/app/services/author.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.scss']
})
export class AuthorEditComponent implements OnInit, OnDestroy {


  searchBooks$ = new Subject<string>();
  books$;

  subscriptionForBook$: Subscription;
  subscriptionForQueryParams$: Subscription;

  newAuthor: Author = {
    name: '',
    country: '',
    dob: 0,
    bio: '',
    written_books: [],
    isNew: true
  };
  
  constructor(private searchService: SearchService, private authorService: AuthorService, private activatedRoute: ActivatedRoute, private router: Router) { }

  bookSearcher(): void {
    this.subscriptionForBook$ = this.searchService.searchBook(this.searchBooks$).subscribe(res=>{
      this.books$ = res;
    })
  }

  addBook(book): void {
    this.books$ = '';
    this.newAuthor.written_books.push(book);
  }

  removeBook(book): void {
    for(let i = 0; i < this.newAuthor.written_books.length; i++) {
      if(this.newAuthor.written_books[i] === book) {
          this.newAuthor.written_books.splice(i, 1);
          break;
      }
  }
}

  saveAuthor():void {;
    if(this.newAuthor.isNew) {
       this.authorService.addAuthor(this.newAuthor).subscribe(res=>{
        if(res) this.router.navigate(['adminspanel/authors']);
       });
    }
    else {
      this.authorService.changeAuthor(this.newAuthor).subscribe(res=>{
        if(res) this.router.navigate(['adminspanel/authors']);
      });
    }
  }

  ngOnInit(): void {
    this.bookSearcher();
    this.getBookDetailsFromQueryToEdit();
  }

  getBookDetailsFromQueryToEdit(): void {
      this.subscriptionForQueryParams$ = this.activatedRoute.queryParams.subscribe(data=>{
        if(data.JSONauthor) {
          let parsedData = JSON.parse(data.JSONauthor);
          this.newAuthor = parsedData;
        }
      })
  }

  ngOnDestroy(): void {
    this.subscriptionForBook$.unsubscribe();
    this.subscriptionForQueryParams$.unsubscribe();
  }

}
