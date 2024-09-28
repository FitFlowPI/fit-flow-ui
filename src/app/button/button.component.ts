import {Component, ElementRef, HostListener, Input, Renderer2, ViewChild} from '@angular/core';
import {SvgGeneratorComponent} from "../generators/svg-generator/svg-generator.component";

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    SvgGeneratorComponent
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

  @Input({ required: true }) id: string = '';
  @ViewChild('button') button?: ElementRef<HTMLButtonElement>;

  constructor(private renderer: Renderer2) {}

  @HostListener('click', ['$event'])
  handleClick(e: MouseEvent) {

    if (this.button) {

      const buttonRect = this.button.nativeElement.getBoundingClientRect();

      const ripple = this.renderer.createElement('span');
      this.renderer.addClass(ripple, 'ripple');
      this.renderer.setStyle(
        ripple,
        'top',
        `${e.clientY - buttonRect.y}px`
      );
      this.renderer.setStyle(
        ripple,
        'left',
        `${e.clientX - buttonRect.x}px`
      );
      this.renderer.appendChild(this.button.nativeElement, ripple);

      setTimeout(() => {
        this.renderer.removeChild(this.button?.nativeElement, ripple);
      }, 800);
    }
  }

}
