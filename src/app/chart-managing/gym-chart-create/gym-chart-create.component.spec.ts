import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GymChartCreateComponent } from './gym-chart-create.component';

describe('GymChartCreateComponent', () => {
  let component: GymChartCreateComponent;
  let fixture: ComponentFixture<GymChartCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GymChartCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GymChartCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
