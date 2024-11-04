import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GymChartSelectComponent } from './gym-chart-select.component';

describe('GymChartSelectComponent', () => {
  let component: GymChartSelectComponent;
  let fixture: ComponentFixture<GymChartSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GymChartSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GymChartSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
