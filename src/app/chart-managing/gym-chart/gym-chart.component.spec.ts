import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GymChartComponent } from './gym-chart.component';

describe('GymChartComponent', () => {
  let component: GymChartComponent;
  let fixture: ComponentFixture<GymChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GymChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GymChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
