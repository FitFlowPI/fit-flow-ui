import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingDaySelectComponent } from './training-day-select.component';

describe('GymChartSelectComponent', () => {
  let component: TrainingDaySelectComponent;
  let fixture: ComponentFixture<TrainingDaySelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingDaySelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingDaySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
