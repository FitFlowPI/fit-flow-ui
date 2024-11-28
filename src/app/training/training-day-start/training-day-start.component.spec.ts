import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingDayStartComponent } from './training-day-start.component';

describe('TrainingDayStartComponent', () => {
  let component: TrainingDayStartComponent;
  let fixture: ComponentFixture<TrainingDayStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingDayStartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingDayStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
