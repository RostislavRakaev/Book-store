import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { BookService } from '../services/book.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  userId = this._auth.getDecoded()._id;
  purchasedBooks = [];

  subscriptions$: Subscription = new Subscription();

  constructor(private bookService: BookService, private _auth: AuthService) { }

  getBooks(): void {
    this.subscriptions$.add(

      this.bookService.getUsersBooks(this.userId).subscribe(res=>this.purchasedBooks = res)

    )
  }

  ngOnInit(): void {
    this.getBooks();
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }

}
