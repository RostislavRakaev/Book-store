import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Author } from '../adminspanel/authors/author';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  url: string = 'http://localhost:3000/api/authors'
  
  constructor(private http:HttpClient) { }

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.url);
  }

  addAuthor(author: Author): Observable<Author[]> {
    return this.http.post<Author[]>(this.url, author);
  }

  changeAuthor(author: Author): Observable<Author[]> {
    return this.http.put<Author[]>(`${this.url}/${author._id}`, author);
  }

  deleteAuthor(id: number): Observable<Author> {
    return this.http.delete<Author>(`${this.url}/${id}`);
  }

}
