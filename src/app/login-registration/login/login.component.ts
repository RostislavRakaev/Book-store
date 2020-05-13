import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginUserData = {
    email: '',
    password: ''
  }; 

  subscriptions$: Subscription = new Subscription();

  constructor(private _auth: AuthService, private router: Router) { }

  loginUser(): void {
    this.subscriptions$.add(

      this._auth.loginUser(this.loginUserData).subscribe(resp=>{
        this.router.navigate(['']);
        localStorage.setItem('token', resp.token);
      })

    )
  }

  ngOnInit(): void {
  }
  
  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }

}
