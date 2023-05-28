import { Pipe, PipeTransform } from '@angular/core';

// PURE PIPE
@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value: any): any {
    return value.split('').reverse().join('');
  }

}
