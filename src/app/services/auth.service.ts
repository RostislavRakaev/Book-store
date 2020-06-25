import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';
import { User } from '../login-registration/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  registeredUrl = 'https://book-server-api.herokuapp.com/api/users';
  loginUrl = 'https://book-server-api.herokuapp.com/api/login';

  constructor(private http: HttpClient) { }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(this.registeredUrl, user);
  }

  loginUser(user: any): Observable<any> {
    return this.http.post<any>(this.loginUrl, user);
  }

  get logIn(): boolean {
    if (localStorage.getItem('token')) {
      let role = this.getDecoded().role;
      if (role === 'user') {
        return true;
      }
      else {
        return false;
      }
    }

  }

  get LogInForAdmin(): boolean {
    if (localStorage.getItem('token')) {
      let role = this.getDecoded().role;
      if (role === "admin") {
        return true;
      }
      else {
        return false;
      }
    }

  }

  getDecoded(): any {
    let token = localStorage.getItem('token');
    let decodedData = jwt_decode(token);
    return decodedData;
  }

  getToken(): any {
    return localStorage.getItem('token');
  }

}
