import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { Books } from '../books/book';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  baseUrl: string = 'http://localhost:3000/api/search';

  constructor(private http: HttpClient) { }

  search(inputs) {
      return inputs
        .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(input=>this.searchEntries(input))
        )
  }

  searchEntries(title) {
    return this.http.get(this.baseUrl + '?title=' + title);
  }

  searchAuthor(inputs) {
    return inputs
      .pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(input=>this.authorSearcher(input))
      )
}

  authorSearcher(name) {
    return this.http.get(this.baseUrl + '?author=' + name );
  }
}
