import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value) {
    if(!value) return;
    return value.reverse(); // reverse the observable value being returned.
  }

}
