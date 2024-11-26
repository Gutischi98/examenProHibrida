import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoFecha',
  standalone: true,
})
export class FormatoFechaPipe implements PipeTransform {
  transform(valor: string): string {
    const opciones: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(valor).toLocaleDateString('es-ES', opciones);
  }
}
