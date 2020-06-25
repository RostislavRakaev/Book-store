import { Component, OnInit } from '@angular/core';
import { BasketService } from '../services/basket.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public basketService: BasketService, public authService: AuthService, private router: Router) { }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

  ngOnInit(): void {
  }


}
