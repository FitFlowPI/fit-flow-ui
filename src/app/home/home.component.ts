import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { NgClass, NgStyle } from "@angular/common";
import { SvgGeneratorComponent } from "../generators/svg-generator/svg-generator.component";
import { ChartModule } from 'primeng/chart';
import { demoChartOptions2, demoChartData2 } from "../JSONs";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgClass, NgStyle, SvgGeneratorComponent, ChartModule],
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('navTop') navTop?: ElementRef<HTMLDivElement>;
  @ViewChild('logo') logo?: ElementRef<SVGElement>;
  @ViewChild('title') title?: ElementRef<HTMLHeadingElement>;
  @ViewChild('chart') chart?: ElementRef<HTMLDivElement>;
  @ViewChild('chartTitle') chartTitle?: ElementRef<HTMLDivElement>;
  @ViewChild('chartContainer') chartContainer?: ElementRef<HTMLDivElement>;


  scrollPosition: number = 0;
  originalPageHeight: number = 0;
  originalTopValues: { [key: string]: number } = {};
  logoHeight: number = 36;
  isInNav: boolean = false;

  ngAfterViewInit() {
    this.originalPageHeight = window.innerHeight;
    this.storeInitialYPositions();
    this.updateLogo();
  }

  private storeInitialYPositions() {
    if (this.chart) {
      this.originalTopValues['chart'] = this.getElementTop(this.chart.nativeElement);
    }
    if (this.chartTitle) {
      this.originalTopValues['chartTitle'] = this.getElementTop(this.chartTitle.nativeElement);
    }
    if (this.chartContainer) {
      this.originalTopValues['chartContainer'] = this.getElementTop(this.chartContainer.nativeElement);
    }
  }


  private getElementTop(element: HTMLElement | SVGElement): number {
    return element.getBoundingClientRect().top + window.scrollY;
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.updateLogo();
    this.handleChart(window.innerHeight - this.originalPageHeight);
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.scrollPosition = window.scrollY;
    this.updateLogo();
    this.handleChart(window.innerHeight - this.originalPageHeight);
  }

  private updateLogo() {
    if (this.navTop && this.logo) {
      this.navTop.nativeElement.style.minHeight = `${
        this.logoHeight +
        parseInt(getComputedStyle(this.navTop.nativeElement).paddingTop) +
        parseInt(getComputedStyle(this.navTop.nativeElement).paddingBottom)
      }px`;
    }
    this.updateLogoScale(1, 4);
    this.updateLogoPosition();
  }


  private updateLogoScale(minScale: number, maxScale: number) {
    if (this.logo) {
      const element = this.logo.nativeElement;

      // Calculate the target scroll position for max scale
      const targetScrollPosition = (window.innerHeight / 2) - (element.getBoundingClientRect().height / 2);

      // Calculate scale based on current scroll position
      const scaleRange = maxScale - minScale;
      const scaleProgress = Math.min(Math.max(1 - (this.scrollPosition / targetScrollPosition), 0), 1);
      const newScale = minScale + (scaleProgress * scaleRange);

      // Set the scale style
      element.style.scale = newScale.toString();
    }
  }

  private updateLogoPosition() {
    if (this.logo && this.navTop) {
      const logoElement = this.logo.nativeElement;
      const navElement = this.navTop.nativeElement;
      const rect = logoElement.getBoundingClientRect();

      // Calculate the middle of the viewport
      const middleOfViewport = (window.innerHeight / 2) - (rect.height / 2);

      if (this.scrollPosition >= middleOfViewport) {
        logoElement.style.position = 'initial';
        logoElement.style.top = ''; // Reset any inline styles for top
        this.isInNav = true;
      } else {
        logoElement.style.position = 'absolute';
        logoElement.style.top = `${(middleOfViewport - this.scrollPosition) + parseInt(getComputedStyle(navElement).paddingTop)}px`; // Center vertically
        this.isInNav = false;
      }

    }
  }


  private handleChart(pageHeightOffset: number) {
    if (!this.chartContainer || !this.chartTitle || !this.chart) return;

    // const bottomCamera = window.innerHeight - this.chartContainer.nativeElement.getBoundingClientRect().height;
    const middleCamera = (window.innerHeight / 2) - (this.chartContainer.nativeElement.getBoundingClientRect().height / 2)
    this.showElementIn(
      this.chart.nativeElement,
      window.innerHeight / 1.5,
      this.originalTopValues['chart'] + pageHeightOffset
    );
    this.showElementIn(
      this.chartTitle.nativeElement,
      window.innerHeight / 1.5,
      this.originalTopValues['chartTitle'] + pageHeightOffset
    );
    this.stickToScreenIn(
      this.chartContainer.nativeElement,
      middleCamera,
      window.innerHeight * 3,
      this.originalTopValues['chartContainer'] + pageHeightOffset
    );
  }

  private stickToScreenIn(element: HTMLElement, cameraOffset: number, maxPosition: number, minPosition: number) {
    if (this.scrollPosition + cameraOffset >= maxPosition || this.scrollPosition + cameraOffset <= minPosition) {
      element.classList.replace('sticky', 'can-stick');
      element.style.position = 'absolute';
      element.style.top = `${Math.min(maxPosition, Math.max(minPosition, this.scrollPosition + cameraOffset))}px`;
    } else {
      element.classList.replace('can-stick', 'sticky');
      this.FixToScreen(element, cameraOffset);
    }
  }

  private FixToScreen(element: HTMLElement, stickPosition: number) {
    element.style.position = 'fixed';
    element.style.top = `${stickPosition}px`;
  }

  private showElementIn(element: HTMLElement, cameraOffset: number, desiredPosition: number): void {
    if (cameraOffset + this.scrollPosition >= desiredPosition) {
      element.classList.remove('no-display');
      element.classList.replace('hidden', 'visible');
    } else {
      element.classList.replace('visible', 'hidden');
    }
  }

  protected readonly demoChartData2 = demoChartData2;
  protected readonly demoChartOptions2 = demoChartOptions2;
}
