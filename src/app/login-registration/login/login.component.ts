import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginUserData = {
    email: '',
    password: ''
  }; 
  constructor(private _auth:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  loginUser() {
    this._auth.loginUser(this.loginUserData).subscribe(resp=>{
      console.log(resp);
      this.router.navigate(['profile']);
      localStorage.setItem('token', resp.token);
    })
  }
 

}
