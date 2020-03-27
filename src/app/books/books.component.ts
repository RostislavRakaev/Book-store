import { Component, OnInit, Inject } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Observable } from 'rxjs';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModalWindowComponent } from './modal-window/modal-window.component';
import { Books } from './book';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})


export class BooksComponent implements OnInit {

  url:string = '../assets/books.json'; 

  books:Observable<Books[]>;

  constructor(private httpService:HttpService, public dialog: MatDialog) { }

  getBooksApi() {
    return this.httpService.getBooks(this.url)
    .pipe()
    .subscribe((data:any)=>{
      return this.books = data.books;
    })
  }

  openModal(book:Books[]) {
    this.dialog.open(ModalWindowComponent, {
      data: book
    });
  }


  ngOnInit() {

    this.getBooksApi();
    
  }

  ngOnDestroy() {
    this.getBooksApi().unsubscribe();
  }


}

