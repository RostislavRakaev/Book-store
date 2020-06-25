import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { BookService } from '../services/book.service';
import { Subscription } from 'rxjs';
import { Books } from '../books/book';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  userId: number = this._auth.getDecoded()._id;
  breakpoint: number = 3;

  purchasedBooks: Books[] = [];

  subscriptions$: Subscription = new Subscription();

  constructor(private bookService: BookService, private _auth: AuthService) { }

  getBooks(): void {
    this.subscriptions$.add(

      this.bookService.getUsersBooks(this.userId).subscribe(res => this.purchasedBooks = res)

    )
  }

  onResize(event) {
    this.breakpoint = (window.innerWidth <= 500) ? 1 : 3;
  }

  ngOnInit(): void {
    this.getBooks();
    this.breakpoint = (window.innerWidth <= 500) ? 1 : 3;
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }

}
