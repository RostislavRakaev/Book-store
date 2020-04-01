import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule } from '@angular/forms'
import { AuthService } from '../services/auth.service';



@NgModule({
  declarations: [LoginComponent, RegistrationComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  bootstrap: [
    LoginComponent
  ],
  providers: [
    AuthService
  ]
})
export class LoginRegistrationModule { }
