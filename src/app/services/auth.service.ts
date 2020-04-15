import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jwt_decode from 'jwt-decode';

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
  public get LogInForAdmin():boolean {
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

  getDecoded():any {
    let data = localStorage.getItem('token');
    let decodedData = jwt_decode(data);
    return decodedData;
  }

}
