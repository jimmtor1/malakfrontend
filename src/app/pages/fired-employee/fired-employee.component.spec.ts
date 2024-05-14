import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiredEmployeeComponent } from './fired-employee.component';

describe('FiredEmployeeComponent', () => {
  let component: FiredEmployeeComponent;
  let fixture: ComponentFixture<FiredEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiredEmployeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FiredEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
