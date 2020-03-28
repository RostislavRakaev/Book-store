import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Books } from '../book';


@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss']
})
export class ModalWindowComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalWindowComponent>, @Inject(MAT_DIALOG_DATA) public book:any) {}

  ngOnInit() {
  }
  addToBasket(chosenBook){
    this.dialogRef.close(chosenBook)
  }

}
