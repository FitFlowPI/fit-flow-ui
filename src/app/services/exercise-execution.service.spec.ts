import { TestBed } from '@angular/core/testing';

import { ExerciseExecutionService } from './exercise-execution.service';

describe('ExerciseExecutionService', () => {
  let service: ExerciseExecutionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExerciseExecutionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
