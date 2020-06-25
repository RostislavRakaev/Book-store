import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../login-registration/user';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = 'https://book-server-api.herokuapp.com/api/users';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getUsers(): Observable<User[]> {
    const headers = new HttpHeaders({
      'authorization': `Bearer ${this.authService.getToken()}`
    })

    return this.http.get<User[]>(this.url, { headers });
  }

  editUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.url}/${user._id}`, user);
  }

}
