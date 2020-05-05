import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../login-registration/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  editUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.url}/${user._id}`, user);
  }

}
