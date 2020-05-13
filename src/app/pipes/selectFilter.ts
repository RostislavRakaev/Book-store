import { Pipe, PipeTransform } from '@angular/core';
import { Books } from '../books/book';

@Pipe({
  name: 'selectFilter',
  pure: false
})
export class SelectFilterPipe implements PipeTransform {

  transform(books: Books[], select?: any): Books[] {
    if(!select) {
      return books;
    }
    else {
      switch(select) {
        case 'lowToHigh': {
          return books.sort((a, b)=> a.price - b.price);
        }
        case 'HighToLow': {
          return books.sort((a, b)=> b.price - a.price);
        }
        default: {
          return books;
        }
      }
    }

  }

}
