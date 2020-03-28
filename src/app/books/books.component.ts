import { Component, OnInit, Inject } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Observable } from 'rxjs';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ModalWindowComponent } from './modal-window/modal-window.component';
import { Books } from './book';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})


export class BooksComponent implements OnInit {
  selected = 'option2';
  url:string = '../assets/books.json'; 

  books:Observable<Books[]>;

  basketDialogRef:MatDialogRef<ModalWindowComponent>

  constructor(private httpService:HttpService, public dialog: MatDialog) { }

  getBooksApi() {
    return this.httpService.getBooks(this.url)
    .pipe()
    .subscribe((data:any)=>{
      return this.books = data.books;
    })
  }

  openModal(book:Books[]) {
    this.basketDialogRef = this.dialog.open(ModalWindowComponent, {
      data: book
    });
    this.basketDialogRef.afterClosed().subscribe(result=>{
      console.log(result)
    })
  }


  ngOnInit() {

    this.getBooksApi();
    
  }

  ngOnDestroy() {
    this.getBooksApi().unsubscribe();
  }


}

