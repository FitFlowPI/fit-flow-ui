import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTime',
  standalone: true
})
export class FormatTimePipe implements PipeTransform {

  transform(
    value: number | null | undefined,
    unit: 'seconds' | 'centiseconds' = 'centiseconds'
  ): { text: string; isCountdown: boolean } {
    if (value == null) {
      return { text: '--:--', isCountdown: false };
    }

    const isCountdown = value < 0;
    const absValue = Math.abs(value);

    // Convert input to centiseconds if it's in seconds
    const timeInCs = unit === 'seconds' ? absValue * 100 : absValue;

    const minutes = Math.floor(timeInCs / 6000); // Minutes
    const seconds = Math.floor((timeInCs % 6000) / 100); // Seconds
    const centiseconds = timeInCs % 100; // Remaining centiseconds

    let formattedSeconds: string;
    if (unit === 'centiseconds') {
      formattedSeconds = `${seconds.toString().padStart(2, '0')}.<span class="ms">${centiseconds.toString().padStart(2, '0')}</span>`;
    } else {
      formattedSeconds = seconds.toString().padStart(2, '0');
    }

    let text: string;
    if (minutes === 0) {
      text = isCountdown ? `-${formattedSeconds}` : formattedSeconds;
    } else {
      const formattedMinutes = minutes.toString().padStart(2, '0');
      text = isCountdown ? `-${formattedMinutes}:${formattedSeconds}` : `${formattedMinutes}:${formattedSeconds}`;
    }

    return { text, isCountdown };
  }

}
