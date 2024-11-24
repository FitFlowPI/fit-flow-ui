import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingDayCreateComponent } from './training-day-create.component';

describe('TrainingDayCreateComponent', () => {
  let component: TrainingDayCreateComponent;
  let fixture: ComponentFixture<TrainingDayCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingDayCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingDayCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
