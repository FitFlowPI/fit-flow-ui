import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgGeneratorComponent } from './svg-generator.component';

describe('SvgGeneratorComponent', () => {
  let component: SvgGeneratorComponent;
  let fixture: ComponentFixture<SvgGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SvgGeneratorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SvgGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
