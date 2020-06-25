import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule } from '@angular/forms'
import { AuthService } from '../services/auth.service';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [LoginComponent, RegistrationComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  bootstrap: [
    LoginComponent
  ],
  providers: [
    AuthService
  ]
})
export class LoginRegistrationModule { }
