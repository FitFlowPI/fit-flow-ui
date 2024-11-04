import {AfterViewInit, ChangeDetectorRef, Component, HostListener} from '@angular/core';
import { HomeComponent } from "./home/home.component";
import {RouterLink, RouterOutlet} from "@angular/router";
import {SvgGeneratorComponent} from "./shared/svg-generator/svg-generator.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent, RouterLink, RouterOutlet, SvgGeneratorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit{

  constructor(private cdRef: ChangeDetectorRef) {}

  title = 'fit-flow-ui';

  // background wave svg properties
  waveHeight: number = 200;
  count: number = 20;
  thickness: number = 15;
  blur: number = 15;
  speed: number = 5;
  opacity: number = 0.1;
  width: string | number = '120%';
  height: string | number = '25%';
  rotatedHeight: string | number = '60%';
  displacement: 'fasterTop' | 'fasterBottom' | 'fixed' = 'fasterTop';

  // ----------------------------------------------------

  isMobile: boolean | null = null;
  heightValue: string | number = '';

  ngAfterViewInit(): void {
    this.isMobile = window.innerWidth >= 600;
    this.updateHeightValue();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.isMobile = window.innerWidth >= 600;
    this.updateHeightValue();
  }

  updateHeightValue(): void {
    this.heightValue = this.isMobile ? this.rotatedHeight : this.height;
    this.cdRef.detectChanges();  // Aciona a detecção de mudanças manualmente
  }
}
