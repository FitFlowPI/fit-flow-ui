import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit, Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import {SvgGeneratorComponent} from "../svg-generator/svg-generator.component";
import {NgStyle} from "@angular/common";
import {buttonRipple} from "./buttonEffects";

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    SvgGeneratorComponent,
    NgStyle
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  styles:
  `:host {

  }`
})
export class ButtonComponent implements AfterViewInit{

  @Input({ required: true }) id: string = '';
  @Input() colors: Array<string> = ['#2805FF', '#FE9800'];
  @Input() borderRadius: string = '30px';
  @Input() padding: string = '8px 25px';
  @Input() borderWidth: string = '2px';
  @Input() aspectRatio: string = 'auto';
  @Input() display: string = 'inline-flex';
  @Input() height: string = 'auto';
  @Input() width: string = 'auto';
  @Input() maxHeight: string = 'auto';
  @Input() maxWidth: string = 'auto';
  @Input() minHeight: string = 'auto';
  @Input() minWidth: string = 'auto';
  @Input() fontSize: string = '0.95rem';
  @Input() fontWeight: string = '500';
  @Input() wrapContent: boolean = true;
  @Output() isActive: boolean = false;
  @ViewChild('button') button?: ElementRef<HTMLButtonElement>;
  @ViewChild('waveBackground', { read: ElementRef }) waveBackground?: ElementRef;

  placeholder: string = '';

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngAfterViewInit(): void {
    this.renderer.setStyle(this.el.nativeElement, 'background-image', this.placeholder);
    this.renderer.setStyle(this.el.nativeElement, 'border-radius', this.borderRadius);
    this.renderer.setStyle(this.el.nativeElement, 'min-height', this.minHeight);
    this.renderer.setStyle(this.el.nativeElement, 'min-width', this.minWidth);
    this.renderer.setStyle(this.el.nativeElement, 'max-height', this.maxHeight);
    this.renderer.setStyle(this.el.nativeElement, 'max-height', this.maxWidth);
  }

  @HostBinding('style.width') get hostWidth() {
    return this.wrapContent ? 'auto' : this.width;
  }

  @HostListener('click', ['$event'])
  handleClick(e: MouseEvent) {
    buttonRipple(this.id, e, this.renderer, this.button!.nativeElement)
  }

  useSvgBackground(value: string) {
    this.placeholder = value;
  }
}
