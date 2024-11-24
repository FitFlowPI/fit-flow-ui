import {
  AfterViewInit, ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input, OnChanges,
  OnInit, Output,
  Renderer2, SimpleChanges,
  ViewChild
} from '@angular/core';
import {SvgGeneratorComponent} from "../svg-generator/svg-generator.component";
import {NgClass, NgStyle} from "@angular/common";
import {buttonRipple} from "./buttonEffects";

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    SvgGeneratorComponent,
    NgStyle,
    NgClass
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  styles:
  `:host {

  }`
})
export class ButtonComponent implements AfterViewInit, OnInit, OnChanges{

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
  @Input() disabled: boolean = false;
  @Input() gap: string = 'auto';

  @Input() isActive: boolean = false;
  @Input() isEnabled: boolean = true;

  @ViewChild('button') button?: ElementRef<HTMLButtonElement>;
  @ViewChild('waveBackground', { read: ElementRef }) waveBackground?: ElementRef;

  placeholder: string = '';
  private grayScale: Array<string> = ['#868686', '#414141'];
  public buttonColor: Array<string> = ['#2805FF', '#FE9800'];

  public cursor: string = 'pointer';

  constructor(private renderer: Renderer2, private el: ElementRef) {}



  ngOnInit() {
    this.changeButtonStyle();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['isEnabled']) {
      this.changeButtonStyle();
    }
  }

  ngAfterViewInit(): void {
    this.renderer.setStyle(this.el.nativeElement, 'background-image', this.placeholder);
    this.renderer.setStyle(this.el.nativeElement, 'border-radius', this.borderRadius);
    this.renderer.setStyle(this.el.nativeElement, 'min-height', this.minHeight);
    this.renderer.setStyle(this.el.nativeElement, 'min-width', this.minWidth);
    this.renderer.setStyle(this.el.nativeElement, 'max-height', this.maxHeight);
    this.renderer.setStyle(this.el.nativeElement, 'max-width', this.maxWidth);
  }

  @HostBinding('style.width') get hostWidth() {
    return this.wrapContent ? 'auto' : this.width;
  }

  @HostListener('click', ['$event'])
  handleClick(e: MouseEvent) {
    if (!this.isEnabled) return;
    if (this.isActive) return;
    buttonRipple(this.id, e, this.renderer, this.button!.nativeElement);
  }

  private changeButtonStyle() {
    if (this.isEnabled) {
      this.buttonColor = this.colors;
      this.cursor = 'pointer';
    } else {
      this.buttonColor = this.grayScale;
      this.cursor = 'not-allowed';
    }

  }

  useSvgBackground(value: string) {
    if (!this.wrapContent) this.placeholder = value;
  }
}
