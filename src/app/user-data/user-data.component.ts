import {
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

@Component({
  selector: 'app-user-data',
  standalone: true,
  imports: [
    LoginComponent,
    SvgGeneratorComponent,
    NgIf,
    RegisterComponent,
    NgClass
  ],
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.scss'
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
    private elementRef: ElementRef
  ) {}

  ngOnInit():void {
    this.route.params.subscribe(params => {
      const newActionType = params['actionType'];

      if (newActionType !== this.actionType) {
        this.actionType = newActionType;

        // Remove a classe de animação desativada quando o actionType mudar
        const children = this.elementRef.nativeElement.children;
        for (let child of children) {
          this.renderer.removeClass(child, 'disabled-animation');
        }
      }
    });
  }
}
