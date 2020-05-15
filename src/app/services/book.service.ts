import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Books } from '../books/book';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  url: string = 'http://localhost:3000/api';

  constructor(private http:HttpClient) { }

  getBooksApi(): Observable<Books[]> {
    return this.http.get<Books[]>(`${this.url}/books`)
              .pipe(
                retry(3)
              )
  }
  getUsersBooks(userId: number): Observable<Books[]> {
    return this.http.get<Books[]>(`${this.url}/users/${userId}/books`);
  }
  
  purchaseBook(userId: number, bookId:Books[]): Observable<Books[]> {
    return this.http.put<Books[]>(`${this.url}/users/${userId}/books`, bookId);
  }

  addBook(book: Books): Observable<Books> {
    return this.http.post<Books>(`${this.url}/books`, book);
  }

  updateBook(book: Books): Observable<Books> {
    return this.http.put<Books>(`${this.url}/books/${book._id}`, book);
  }

  deleteBook(id: number): Observable<Books> {
    return this.http.delete<Books>(`${this.url}/books/${id}`);
  }

}
