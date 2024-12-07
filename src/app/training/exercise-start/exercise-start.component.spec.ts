import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseStartComponent } from './exercise-start.component';

describe('ExerciseStartComponent', () => {
  let component: ExerciseStartComponent;
  let fixture: ComponentFixture<ExerciseStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseStartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExerciseStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
