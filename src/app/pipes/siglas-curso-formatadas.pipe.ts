import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'siglasCursoFormatadas',
  standalone: true
})
export class SiglasCursoFormatadasPipe implements PipeTransform {

  transform(value: string): string  {
    const cursos = {
      TDS: 'Tecnico em Desenvolvimento de Sistemas',
      ADM: 'Administração',
      LOG: 'Logística'
    };

    if (value in cursos) {
      return cursos[value as keyof typeof cursos];
    }

    return value;
  }

}
