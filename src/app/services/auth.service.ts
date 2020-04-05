import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private _registeredUrl = 'http://localhost:3000/api/users';
  private _loginUrl = 'http://localhost:3000/api/login';

  token;

  constructor(private http:HttpClient) { }

  registerUser(user) {
    return this.http.post<any>(this._registeredUrl, user);
  }
  
  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user);
  }
  public get logIn(): boolean {
    return (localStorage.getItem('token') !== null);
  }
}
