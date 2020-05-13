import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { Books } from '../books/book';
import { BookService } from './book.service';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  baseUrl: string = 'http://localhost:3000/api/search';

  constructor(private http: HttpClient, private bookService: BookService) { }

  searchBook(inputs) {
      return inputs
        .pipe(
        distinctUntilChanged(),
        switchMap((input: string)=> input.length > 0? this.bookSearch(input): this.bookService.getBooksApi())
        )
  }

  bookSearch(title) {
    return this.http.get(this.baseUrl + '?title=' + title);
  }

  searchAuthor(inputs) {
    return inputs
      .pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((input: string)=> this.authorSearcher(input))
      )
}

  authorSearcher(name) {
    return this.http.get(this.baseUrl + '?author=' + name );
  }




}
