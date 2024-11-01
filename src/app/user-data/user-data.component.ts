import {
  AfterViewInit, ChangeDetectorRef,
  Component,
  ElementRef, HostListener,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges, ViewChild,
} from '@angular/core';
import {LoginComponent} from "./login/login.component";
import {SvgGeneratorComponent} from "../shared/svg-generator/svg-generator.component";
import {ActivatedRoute} from "@angular/router";
import {NgClass, NgIf} from "@angular/common";
import {RegisterComponent} from "./register/register.component";
import {PasswordRecoveryComponent} from "./password-recovery/password-recovery.component";
import {UpdatePasswordComponent} from "./update-password/update-password.component";
import {GenderSelectComponent} from "./user-details/gender-select/gender-select.component";

@Component({
  selector: 'app-user-data',
  standalone: true,
  imports: [
    LoginComponent,
    SvgGeneratorComponent,
    NgIf,
    RegisterComponent,
    NgClass,
    PasswordRecoveryComponent,
    UpdatePasswordComponent,
    GenderSelectComponent
  ],
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.scss',
})
export class UserDataComponent implements OnInit, AfterViewInit {

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

  @ViewChild('formCard') formCard?: ElementRef;

  actionType: string = '';

  constructor(
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private cdRef: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {}

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

  ngOnInit():void {
    this.route.params.subscribe(params => {
      const newActionType = params['actionType'];

      if (newActionType !== this.actionType) {
        this.actionType = newActionType;
        // Delay class removal until view is initialized
        this.cdRef.detectChanges(); // Detect and trigger view changes
        this.removeAnimationClass();
      }
    });
  }

  removeAnimationClass(): void {
    const children = this.elementRef.nativeElement.children;
    for (let child of children) {
      if (child.id === this.actionType) {
        console.log('removed from: ', child.id);
        this.renderer.removeClass(child, 'disabled-animation');
      }
    }
  }

}
