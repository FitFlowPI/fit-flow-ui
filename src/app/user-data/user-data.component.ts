import {
  AfterViewInit, ChangeDetectorRef,
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges, ViewChild,
} from '@angular/core';
import {LoginComponent} from "./login/login.component";
import {SvgGeneratorComponent} from "../generators/svg-generator/svg-generator.component";
import {ActivatedRoute} from "@angular/router";
import {NgClass, NgIf} from "@angular/common";
import {RegisterComponent} from "./register/register.component";
import {PasswordRecoveryComponent} from "./password-recovery/password-recovery.component";
import {UpdatePasswordComponent} from "./update-password/update-password.component";

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
    UpdatePasswordComponent
  ],
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.scss',
})
export class UserDataComponent implements OnInit {
  // background wave svg properties
  waveHeight: number = 200;
  count: number = 20;
  thickness: number = 4;
  blur: number = 15;
  speed: number = 5;
  opacity: number = 0.5;
  displacement: 'fasterTop' | 'fasterBottom' | 'fixed' = 'fasterTop';

  @ViewChild('formCard') formCard?: ElementRef;

  actionType: string = '';

  constructor(
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private cdRef: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {}

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
