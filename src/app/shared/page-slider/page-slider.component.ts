import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  Renderer2
} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-page-slider',
  standalone: true,
  imports: [],
  templateUrl: './page-slider.component.html',
  styleUrl: './page-slider.component.css'
})
export class PageSliderComponent implements OnInit, AfterContentInit {

  @Input({required: true}) paramName?: string;

  constructor(
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private cdRef: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {}


  param: string = '';

  ngOnInit():void {
    this.route.params.subscribe(params => {
      const newParam = params[this.paramName!];

      if (newParam !== this.param) {
        this.param = newParam;
        // Delay class removal until view is initialized
        this.cdRef.detectChanges(); // Detect and trigger view changes
        this.removeAnimationClass();
        this.updateChildrenClasses();
      }
    });
  }

  removeAnimationClass(): void {
    const children = this.elementRef.nativeElement.children;
    for (let child of children) {
      if (child.id === this.param) {
        console.log('removed from: ', child.id);
        this.renderer.removeClass(child, 'disabled-animation');
      }
    }
  }

  ngAfterContentInit(): void {
      this.applyInitialClasses();
  }

  private applyInitialClasses(): void {
    const children = this.elementRef.nativeElement.children;
    for (let child of children) {
      this.renderer.addClass(child, 'slider-component');
      if (child.id !== this.param) this.renderer.addClass(child, 'disabled-animation');
    }
  }

  private updateChildrenClasses(): void {
    const children = this.elementRef.nativeElement.children;
    for (let child of children) {
      const childId = child.id;
      if (childId === this.param) {
        this.renderer.addClass(child, 'visible');
        this.renderer.removeClass(child, 'hidden');
      } else {
        this.renderer.addClass(child, 'hidden');
        this.renderer.removeClass(child, 'visible');
      }
    }
  }
}
