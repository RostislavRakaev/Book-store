import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { BasketComponent } from './basket/basket.component';
import { MybooksComponent } from './mybooks/mybooks.component';




const routes: Routes = [
  {path: '', component: BooksComponent},
  {path: 'basket', component: BasketComponent},
  {path: 'mybooks', component: MybooksComponent},
  {path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
