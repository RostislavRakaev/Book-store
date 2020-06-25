import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

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

  invalidData: boolean = false;

  subscriptions$: Subscription = new Subscription();

  constructor(private _auth: AuthService, private router: Router) { }

  loginUser(): void {
    if (this.loginUserData.email && this.loginUserData.password) {
      this.subscriptions$.add(

        this._auth.loginUser(this.loginUserData).subscribe(resp => {
          this.router.navigate(['']);
          localStorage.setItem('token', resp.token);
        },
          (err) => {
            if (err) this.invalidData = true;
            else this.invalidData = false;
          }
        )

      )
    }
    else this.invalidData = true;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }

}
