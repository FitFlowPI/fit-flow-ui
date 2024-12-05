import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseProgressBarComponent } from './exercise-progress-bar.component';

describe('ExerciseProgressBarComponent', () => {
  let component: ExerciseProgressBarComponent;
  let fixture: ComponentFixture<ExerciseProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseProgressBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExerciseProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
