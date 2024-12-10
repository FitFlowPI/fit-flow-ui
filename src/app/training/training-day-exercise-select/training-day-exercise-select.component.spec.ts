import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingDayExerciseSelectComponent } from './training-day-exercise-select.component';

describe('TrainingDayExerciseSelectComponent', () => {
  let component: TrainingDayExerciseSelectComponent;
  let fixture: ComponentFixture<TrainingDayExerciseSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingDayExerciseSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingDayExerciseSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
