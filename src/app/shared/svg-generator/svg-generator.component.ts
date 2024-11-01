import {
  Component,
  AfterViewInit,
  ElementRef,
  Renderer2,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges, OnInit, Output, EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-svg-generator',
  template: `<ng-content></ng-content>`,
  standalone: true,
  styleUrl: './svg-generator.component.css'
})
export class SvgGeneratorComponent implements AfterViewInit, OnDestroy, OnInit, OnChanges {

  @Input() padding: number = 0;
  @Input() count: number = 18;
  @Input() waveHeight: number = 400;
  @Input() waveLength: number = 1600;
  @Input() thickness: number = 15;
  @Input() offsetX: number = 60;
  @Input() height?: string | number = undefined;
  @Input() width?: string | number = undefined;
  @Input() colors: Array<string> = ['#2805FF', '#FE9800'];
  @Input() displacement: 'fixed' | 'fasterTop' | 'fasterBottom' | 'equal' = 'fixed';
  @Input() display: 'fill' | 'spaced' = "spaced";
  @Input() invertColors: boolean = false;
  @Input() blur: number = 0;
  @Input() opacity: number = 1;
  @Input() speed: number = 1;
  @Input({ required: true }) id: string = '';
  @Output() fixedSvgUrl: EventEmitter<string> = new EventEmitter();

  private actualSize: { width: number; height: number; } = {width: 0, height: 0}; //calculated height
  private resizeObserver!: ResizeObserver;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {
    this.setSize();
  }

  ngAfterViewInit() {
    this.updateSize();
    this.generateWaveStyle();
    this.observeParentSize();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['width'] || changes['height']) {
      console.log('Value changed:');
      this.setSize();
      this.updateSize();
      this.generateWaveStyle();
    }
  }

  private setSize() {
    if (this.height) this.renderer.setStyle(this.el.nativeElement, 'height', this.height);
    if (this.width) this.renderer.setStyle(this.el.nativeElement, 'width', this.width);
  }

  //TODO: change how the width and height is changed to be more compatible with css
  updateSize(): void {
    const isPercentage = (value: string | number) => typeof value === 'string' && value.endsWith('%');
    const extractNumber = (value: string) => parseInt(value.replace(/\D/g, ''), 10);

    const computeDimension = (dimension: string | number, parentSize: number, windowSize: number) => {
      if (isPercentage(dimension)) {
        const percentageValue = extractNumber(dimension as string);
        return (parentSize || windowSize) * percentageValue / 100;
      }
      return dimension as number;
    };

    // Handle height
    if (this.height) {
      const parentHeight = this.el.nativeElement.parentElement?.clientHeight;
      this.actualSize.height = computeDimension(this.height, parentHeight, window.innerHeight);
    } else {
      this.actualSize.height = this.el.nativeElement.clientHeight;
    }

    // Handle width
    if (this.width) {
      const parentWidth = this.el.nativeElement.parentElement?.clientWidth;
      this.actualSize.width = computeDimension(this.width, parentWidth, window.innerWidth);
    } else {
      this.actualSize.width = this.el.nativeElement.clientWidth;
    }
    this.generateWaveStyle();
  }



  private observeParentSize() {
    this.resizeObserver = new ResizeObserver(() => this.updateSize());
    this.resizeObserver.observe(this.el.nativeElement.parentElement);
  }

  ngOnDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  private generateFixedWave() {
    let paths = '';

    const pathHeight = this.waveHeight / 4;
    const availableHeight =
      this.display === 'fill' ?
      (this.actualSize.height - (this.padding * 2)) + (pathHeight * 2) :
      (this.actualSize.height - (this.padding * 2)) - (pathHeight + this.thickness);

    const pathSpacing = availableHeight / (this.count - 1);

    for (let i = 0; i < this.count; i++) {
      const color = this.interpolateColor(this.colors, i / (this.count - 1));
      const viewBoxPosition =
        this.display === 'fill' ?
        this.padding + (this.thickness / 2) + (i * pathSpacing) - pathHeight :
        this.padding + (pathHeight / 2) + (this.thickness / 2) + (i * pathSpacing);

      paths += `<path
          d="
            M 0 ${viewBoxPosition}
            Q ${this.waveLength / 4} ${viewBoxPosition - pathHeight}
              ${this.waveLength / 2} ${viewBoxPosition}
            T ${this.waveLength} ${viewBoxPosition}
          "
          fill="transparent"
          stroke-linecap="square"
          stroke="${color}"
          stroke-width="${this.display === 'fill' ? (availableHeight / (this.count - 1)) + 2 : this.thickness}"
        />`;
    }
    const SvgUrl = `url("${
      this.svgToDataUrl(`
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 ${this.waveLength} ${(this.actualSize.height)}"
            width="${this.waveLength}"
            height="${this.actualSize.height}"
          >
            ${paths}
          </svg>
        `)
    }")`;
    this.renderer.setStyle(this.el.nativeElement, 'filter', `blur(${this.blur}px)`);
    this.renderer.setStyle(this.el.nativeElement, 'opacity', `${this.opacity}`);
    this.renderer.setStyle(this.el.nativeElement, 'animation', `move-wave-fixed-${this.id} ${10 / this.speed}s linear infinite`);
    this.renderer.setStyle(this.el.nativeElement, 'background-image', SvgUrl);
    this.fixedSvgUrl.emit(SvgUrl);
    this.generateAnimations({index: 1});
  }

  private generateDisplacedWave() {

    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
    this.renderer.setStyle(this.el.nativeElement, 'overflow', 'hidden');

    for (let i = 1; i <= this.count; i++) {
      const color = this.interpolateColor(this.colors, i / this.count);
      const path = `<path
        d="
          M 0 ${(this.waveHeight / 2)}
          Q ${this.waveLength / 4} ${(this.waveHeight / 4)}
            ${this.waveLength / 2} ${(this.waveHeight / 2)}
          T ${this.waveLength} ${(this.waveHeight / 2)}
        "
        fill="transparent"
        stroke-linecap="square"
        stroke="${color}"
        stroke-width="${this.thickness}"
      />`;

      // Apply animation based on unique ID
      const duration = 1800 / this.speed;
      const uniqueId = `wave-layer-${i}`;
      let div = this.el.nativeElement.querySelector(`#${uniqueId}`);
      if (!div) {
        div = this.renderer.createElement('div');
        this.renderer.setAttribute(div, 'id', uniqueId);
        this.renderer.addClass(div, 'wave-layer');
        this.renderer.appendChild(this.el.nativeElement, div);
      } else {
        // Clear existing styles and classes if needed
        div.removeAttribute('style');
        div.className = 'wave-layer';
      }
      this.renderer.setStyle(div, 'pointer-events', 'none');
      this.renderer.setStyle(div, 'position', 'absolute');
      this.renderer.setStyle(div, 'bottom', `${(((this.actualSize.height - (this.waveHeight / 4)) / this.count) * (i - 1)) + this.padding}px`);
      this.renderer.setStyle(div, 'height', `${(this.waveHeight / 4) + this.thickness}px`);
      this.renderer.setStyle(div, 'width', '100%');
      this.renderer.setStyle(div, 'background-position', `center center`);
      this.renderer.setStyle(div, 'background-repeat', 'repeat-x');
      this.renderer.setStyle(div, 'filter', `blur(${this.blur}px)`);
      this.renderer.setStyle(div, 'opacity', `${this.opacity}`);
      this.renderer.setStyle(div, 'background-image', `url("${
        this.svgToDataUrl(`
          <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 ${this.waveLength} ${this.waveHeight}"
              width="${this.waveLength}"
              height="${this.waveHeight}"
          >${path}
          </svg>
        `)
      }")`);

      this.renderer.setStyle(div, 'animation', `move-wave-${this.id}-${i} ${duration}s linear infinite`);

      this.renderer.appendChild(this.el.nativeElement, div);
      this.generateAnimations({index: i, offsetX: (i + (i / 2)) * this.offsetX});
    }
  }

  private generateWaveStyle(): void {

    if (this.displacement === 'fixed') {
      this.generateFixedWave();
    }

    if (this.displacement === 'fasterTop') {
      this.generateDisplacedWave();
    }

  }

  svgToDataUrl(svg: string): string {
    const encoded = encodeURIComponent(svg)
      .replace(/'/g, '%27')
      .replace(/"/g, '%22')
      .replace(/\n/g, '');
    return `data:image/svg+xml;charset=utf-8,${encoded}`;
  }

  interpolateColor(colors: Array<string>, factor: number): string {
    if (colors.length < 2) {
      throw new Error("At least two colors are required");
    }

    // Reverse the colors array if invertColors is true
    const colorArray = this.invertColors ? [...colors].reverse() : colors;

    // Determine in which range the factor falls (between 0 and 1)
    const numColors = colorArray.length;
    const scaleFactor = factor * (numColors - 1); // scale factor to the color array index
    const lowerIndex = Math.floor(scaleFactor); // get the lower bound index
    const upperIndex = Math.min(lowerIndex + 1, numColors - 1); // get the upper bound index

    // Calculate local factor between two colors
    const localFactor = scaleFactor - lowerIndex;

    // Get the two colors to interpolate between
    const [r1, g1, b1] = this.hexToRgb(colorArray[lowerIndex]);
    const [r2, g2, b2] = this.hexToRgb(colorArray[upperIndex]);

    // Interpolate between these two colors
    const r = Math.round(r1 + localFactor * (r2 - r1));
    const g = Math.round(g1 + localFactor * (g2 - g1));
    const b = Math.round(b1 + localFactor * (b2 - b1));

    return `rgb(${r}, ${g}, ${b})`;
  }

  hexToRgb(hex: string): number[] {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
  }

  generateAnimations({index, offsetX}: { index: number, offsetX?: number }) {
    const style = document.createElement('style');
    let keyframes = '';

    switch (this.displacement) {
      case 'fixed':
        keyframes = `
          @keyframes move-wave-fixed-${this.id} {
            0% { background-position-x: ${this.waveLength}px; }
            100% { background-position-x: -${this.waveLength}px; }
          }
        `;
        break;

      case 'fasterTop':
        const offset = (index * this.waveLength) + (offsetX ?? 0); // The offset based on SVG width

        keyframes += `
          @keyframes move-wave-${this.id}-${index} {
            0% { background-position-x: ${offset}px; }
            100% { background-position-x: -${offset}px; }
          }
        `;
        break;

      default:
        break;
    }

    style.innerHTML = keyframes;
    document.head.appendChild(style);
  }
}
