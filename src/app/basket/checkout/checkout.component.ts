import {
  Component,
  AfterViewInit,
  OnDestroy,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';

import { NgForm } from '@angular/forms';
import { BasketService } from 'src/app/services/basket.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  @ViewChild('cardInfo') cardInfo: ElementRef;

  card: any;
  cardHandler = this.onChange.bind(this);
  error: string;

  subscriptions$: Subscription = new Subscription();

  constructor(private cd: ChangeDetectorRef, protected basketService: BasketService, private router: Router, private _auth: AuthService) { }

  async onSubmit(form: NgForm) {
    const { token, error } = await stripe.createToken(this.card);
    const userId = this._auth.getDecoded()._id;

    if (error) console.log('Something is wrong:', error);
    else {
      this.subscriptions$.add(
        this.basketService.submitPayment().subscribe(
          x => { if (x.status === 'succeeded') this.router.navigate(['basket-sucess']) },
          err => console.log(err)
        )
      )
      this.subscriptions$.add(
        this.basketService.purchase(userId, this.basketService.showBasket()).subscribe(x => console.log(x))
      )
    }
  }

  onChange({ error }): void {
    if (error) this.error = error.message;
    else this.error = null;
    this.cd.detectChanges();
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.card = elements.create('card');
    this.card.mount(this.cardInfo.nativeElement);
    this.card.addEventListener('change', this.cardHandler);
  }

  ngOnDestroy(): void {
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
    this.subscriptions$.unsubscribe();
  }



}
