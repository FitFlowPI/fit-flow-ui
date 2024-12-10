import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTime',
  standalone: true
})
export class FormatTimePipe implements PipeTransform {

  transform(
    value: number | null | undefined,
    unit: 'seconds' | 'milliseconds' = 'milliseconds'): string
  {
    if (value == null) {
      return '--:--';
    }


    // Convert centiseconds to seconds if necessary
    const totalSeconds = unit === 'milliseconds' ? Math.floor(value / 1000) : value;

    // Calculate minutes and seconds
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);

    // Format the time as mm:ss
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;

  }

}
