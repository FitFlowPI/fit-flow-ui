import { Component, AfterViewInit, ElementRef, Renderer2, Input, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-svg-generator',
  template: `<ng-content></ng-content>`,
  standalone: true,
  styleUrls: ['./svg-generator.component.css']
})
export class SvgGeneratorComponent implements OnInit, AfterViewInit {

  @Input() padding: number = 0;
  @Input() count: number = 18;
  @Input() waveHeight: number = 400;
  @Input() waveLength: number = 1600;
  @Input() thickness: number = 15;
  @Input() offsetX: number = 60;
  @Input() height: number | string = 400;
  @Input() width: number | string = '100%';
  @Input() startColor: string = '#2805FF';
  @Input() endColor: string = '#FE9800';
  @Input() displacement: 'fixed' | 'fasterTop' | 'fasterBottom' | 'equal' = 'fixed';
  @Input() display: 'fill' | 'spaced' = "spaced";
  @Input() invertColors: boolean = false;
  @Input() blur: number = 0;
  @Input() opacity: number = 1;
  @Input() speed: number = 1;
  @Input({ required: true }) id: string = '';

  private actualHeight: number = 0;
  private actualWidth: number = 0;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {
    this.updateDimensions();
  }

  ngAfterViewInit() {
    this.generateWaveStyle();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateDimensions();
    this.generateWaveStyle();
  }

  private updateDimensions() {
    if (this.height.toString().includes('%', -1)) {
      const heightNumber = parseInt(this.height.toString().replace(/\D/g, ''));
      const parentHeight = this.el.nativeElement.parentElement?.clientHeight;
      this.actualHeight = ((parentHeight || window.innerHeight) * heightNumber) / 100;
    } else {
      this.actualHeight = this.height as number;
    }
    if (this.width.toString().includes('%', -1)) {
      const widthNumber = parseInt(this.width.toString().replace(/\D/g, ''));
      const parentWidth = this.el.nativeElement.parentElement?.clientWidth;
      this.actualWidth = ((parentWidth || window.innerWidth) * widthNumber) / 100;
    } else {
      this.actualWidth = this.width as number;
    }

    this.renderer.setStyle(this.el.nativeElement, 'height', `${this.actualHeight}px`);
    this.renderer.setStyle(this.el.nativeElement, 'width', `${this.actualWidth}px`);
  }


  private generateFixedWave() {
    let paths = '';

    const pathHeight = this.waveHeight / 4;
    const availableHeight =
      this.display === 'fill' ?
      ((this.actualHeight - (this.padding * 2)) - (pathHeight + this.thickness)) * 3 :
      (this.actualHeight - (this.padding * 2)) - (pathHeight + this.thickness);

    const pathSpacing = availableHeight / (this.count - 1);

    for (let i = 0; i < this.count; i++) {
      const color = this.interpolateColor(this.startColor, this.endColor, i / (this.count - 1));
      const viewBoxPosition =
        this.display === 'fill' ?
        (this.padding + (pathHeight / 2) + (this.thickness / 2) + (i * pathSpacing)) - (availableHeight / 2) :
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
          stroke-width="${this.thickness}"
        />`;
    }

    this.renderer.setStyle(this.el.nativeElement, 'height', `${this.actualHeight}px`);
    this.renderer.setStyle(this.el.nativeElement, 'width', `${this.actualWidth}px`)
    this.renderer.setStyle(this.el.nativeElement, 'filter', `blur(${this.blur}px)`);
    this.renderer.setStyle(this.el.nativeElement, 'opacity', `${this.opacity}`);
    this.renderer.setStyle(this.el.nativeElement, 'animation', `move-wave-fixed-${this.id} ${10 / this.speed}s linear infinite`)
    this.renderer.setStyle(this.el.nativeElement, 'background-image', `url("${
      this.svgToDataUrl(`
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 ${this.waveLength} ${(this.actualHeight)}"
            width="${this.waveLength}"
            height="${this.actualHeight}"
          >
            ${paths}
          </svg>
        `)
    }")`);
    this.generateAnimations({index: 1});
  }

  private generateDisplacedWave() {

    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
    this.renderer.setStyle(this.el.nativeElement, 'overflow', 'visible');

    for (let i = 1; i <= this.count; i++) {
      const color = this.interpolateColor(this.startColor, this.endColor, i / this.count);
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
        // ... (rest of the div setup code)
        this.renderer.appendChild(this.el.nativeElement, div);
      } else {
        // Clear existing styles and classes if needed
        div.removeAttribute('style');
        div.className = 'wave-layer';
      }
      this.renderer.setStyle(div, 'pointer-events', 'none');
      this.renderer.setStyle(div, 'position', 'absolute');
      this.renderer.setStyle(div, 'bottom', `${(((this.actualHeight - (this.waveHeight / 4)) / this.count) * (i - 1)) + this.padding}px`);
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

  interpolateColor(startColor: string, endColor: string, factor: number): string {
    const [r1, g1, b1] = this.hexToRgb(!this.invertColors ? startColor : endColor);
    const [r2, g2, b2] = this.hexToRgb(!this.invertColors ? endColor : startColor);

    const r = Math.round(r1 + factor * (r2 - r1));
    const g = Math.round(g1 + factor * (g2 - g1));
    const b = Math.round(b1 + factor * (b2 - b1));

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
