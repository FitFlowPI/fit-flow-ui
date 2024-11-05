import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartManagingComponent } from './chart-managing.component';

describe('ChartManagingComponent', () => {
  let component: ChartManagingComponent;
  let fixture: ComponentFixture<ChartManagingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartManagingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartManagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
