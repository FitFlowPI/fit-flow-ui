import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSliderComponent } from './page-slider.component';

describe('PageSliderComponent', () => {
  let component: PageSliderComponent;
  let fixture: ComponentFixture<PageSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
