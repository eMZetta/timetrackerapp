import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {
  transform(value: number): string {
    const hours = Math.floor(value / 3600000);
    const minutes = Math.floor((value % 3600000) / 60000);
    return `${hours}h ${minutes}min`;
  }
}
