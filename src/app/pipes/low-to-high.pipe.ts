import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lowToHigh'
})
export class LowToHighPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
