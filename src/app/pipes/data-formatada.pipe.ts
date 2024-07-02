import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataFormatada',
  standalone: true
})
export class DataFormatadaPipe implements PipeTransform {

  constructor(private dataPipe: DatePipe) {}

  transform(value: Date | string | null, format: string = 'dd/MM/yyyy'): string | null {
    return this.dataPipe.transform(value, format);
  }

}
