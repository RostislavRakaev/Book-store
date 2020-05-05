import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';
import { User } from '../login-registration/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  registeredUrl = 'http://localhost:3000/api/users';
  loginUrl = 'http://localhost:3000/api/login';

  token;

  constructor(private http: HttpClient) { }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(this.registeredUrl, user);
  }
  
  loginUser(user: any): Observable<any> {
    return this.http.post<any>(this.loginUrl, user);
  }
  public get logIn(): boolean {
    if(localStorage.getItem('token')) {
      let role = this.getDecoded().role;
      if(role === 'user') {
        return true;
      }
      else {
        return false;
      }
    }
    
  }
  public get LogInForAdmin(): boolean {
    if(localStorage.getItem('token')) {
      let role = this.getDecoded().role;
      if(role === "admin") {
        return true;
      }
      else {
        return false;
      }
    }

  }

  getDecoded(): any {
    let data = localStorage.getItem('token');
    let decodedData = jwt_decode(data);
    return decodedData;
  }

}
