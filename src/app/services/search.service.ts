import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { BookService } from './book.service';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  baseUrl: string = 'https://book-server-api.herokuapp.com/api/search';

  constructor(private http: HttpClient, private bookService: BookService) { }

  searchBook(inputs) {
    return inputs
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap((input: string) => input.length > 0 ? this.bookSearch(input) : this.bookService.getPaginatedBooks())
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
        switchMap((input: string) => this.authorSearcher(input))
      )
  }

  authorSearcher(name) {
    return this.http.get(this.baseUrl + '?author=' + name);
  }



}
