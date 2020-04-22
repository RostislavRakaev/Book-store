import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Books } from '../books/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  url:string = 'http://localhost:3000/api';

  constructor(private http:HttpClient) { }

  getBooksApi():Observable<Books[]> {
    return this.http.get<Books[]>(`${this.url}/books`);
  }
  getUsersBooks(userId:number):Observable<Books[]> {
    return this.http.get<Books[]>(`${this.url}/users/${userId}/books`);
  }
  
  purchaseBook(userId:number, bookId:Books[]):Observable<Books[]> {
    return this.http.post<Books[]>(`${this.url}/users/${userId}/books`, bookId);
  }

  addBook(book:Books): Observable<Books> {
    return this.http.post<Books>(`${this.url}/books`, book);
  }

}
