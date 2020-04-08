import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registerUserData = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    isAdmin: false
  };
    
  constructor(private _auth:AuthService, private router: Router) { }


  ngOnInit(): void {
  }

  registerUser() {
    this._auth.registerUser(this.registerUserData).subscribe((res)=>{
    },
    (err)=>{
      console.log(err)
    })
    this.router.navigateByUrl('login');
  }
}
