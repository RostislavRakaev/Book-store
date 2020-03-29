import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFilter',
  pure: false
}) 
export class DateFilterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
