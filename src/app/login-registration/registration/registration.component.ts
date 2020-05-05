import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  registerUserData: User = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    role: 'user'
  };
    
  wrongEmail: boolean = false;

  subscriptions$: Subscription = new Subscription();

  constructor(private _auth:AuthService, private router: Router) { }

  registerUser() {
    this.subscriptions$.add(

      this._auth.registerUser(this.registerUserData).subscribe((res)=>{
        if(res !== null) {
          this.router.navigateByUrl('login');
        }
        else {
          this.wrongEmail = !this.wrongEmail;
        }
      },
      (err)=>{
        console.log(err)
      })

    )
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
