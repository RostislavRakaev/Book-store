import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highToLow'
})
export class HighToLowPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
