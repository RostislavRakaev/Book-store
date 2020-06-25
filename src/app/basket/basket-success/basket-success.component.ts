import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Books } from 'src/app/books/book';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-basket-success',
  templateUrl: './basket-success.component.html',
  styleUrls: ['./basket-success.component.scss']
})
export class BasketSuccessComponent implements OnInit {

  purchasedBooks: Books[];
  subscriptions$: Subscription = new Subscription();

  breakpoint: number = 3;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  onResize(event) {
    this.breakpoint = (window.innerWidth <= 500) ? 1 : 3;
  }

  ngOnInit(): void {
    this.subscriptions$.add(
      this.activatedRoute.queryParams.subscribe(x => {
        if (x.purchased_books) this.purchasedBooks = JSON.parse(x.purchased_books);
        else this.router.navigate(['']);
      })
    )

    this.breakpoint = (window.innerWidth <= 500) ? 1 : 3;
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }

}
