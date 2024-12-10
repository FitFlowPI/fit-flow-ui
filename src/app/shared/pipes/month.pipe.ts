import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'month',
  standalone: true
})
export class MonthPipe implements PipeTransform {

  transform(value: string): number | null {
    // Check if the value matches the 'YYYY-MM-DD' format using a regex
    const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-\d{2}$/;

    if (!dateRegex.test(value)) {
      console.warn(`Invalid date format: ${value}`);
      return null;
    }

    // Extract and return the month as a number
    const month = parseInt(value.split('-')[1], 10);
    return month;
  }

}
