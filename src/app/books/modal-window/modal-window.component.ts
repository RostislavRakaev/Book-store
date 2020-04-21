import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { BasketService } from 'src/app/services/basket.service';


@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss']
})
export class ModalWindowComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalWindowComponent>, @Inject(MAT_DIALOG_DATA) public book:any, @Inject(BasketService) private basketService:BasketService) {}

  ngOnInit() {
  }
  addToBasket(chosenBook){
    this.basketService.addToBasket(chosenBook);
    this.dialogRef.close();
  }

}
