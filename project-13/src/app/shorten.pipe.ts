import {Pipe, PipeTransform} from "@angular/core";

// PURE PIPE
@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
  transform(value: any, limit: number): any {
    // value is a string (here)
    if (value.length > limit) {
      return value.substr(0, limit) + ' ...';
    }
    return value;
  }
}
