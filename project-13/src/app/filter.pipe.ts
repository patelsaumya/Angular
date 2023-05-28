import { Pipe, PipeTransform } from '@angular/core';

// (Default behavior) Pure Pipe: Updating arrays or objects doesn't trigger the pipe, but changing the input text triggers it.
@Pipe({
  name: 'filter',
  pure: false // Impure Pipe: you can force the pipe to trigger whenever any data changes on the page
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propName: string): any {
    // value is an array (here)
    if (value.length === 0 || filterString === '') {
      return value;
    }
    const resultArray = [];
    for (const item of value) {
      if (item[propName] === filterString) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }

}
