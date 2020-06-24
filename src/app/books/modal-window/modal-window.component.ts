import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BasketService } from 'src/app/services/basket.service';
import { Books } from '../book';


@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss']
})
export class ModalWindowComponent implements OnInit {

  closeBtnIfWindowIsSlow: boolean = false;

  constructor(public dialogRef: MatDialogRef<ModalWindowComponent>, @Inject(MAT_DIALOG_DATA) public book: any, @Inject(BasketService) private basketService: BasketService) { }

  addToBasket(chosenBook: Books): void {
    this.basketService.addToBasket(chosenBook);
    this.dialogRef.close(undefined);
  }

  modalWindowClose(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.closeBtnIfWindowIsSlow = (window.innerWidth <= 1200) ? true : false;
  }


}
