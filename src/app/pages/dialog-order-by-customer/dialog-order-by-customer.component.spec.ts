import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOrderByCustomerComponent } from './dialog-order-by-customer.component';

describe('DialogOrderByCustomerComponent', () => {
  let component: DialogOrderByCustomerComponent;
  let fixture: ComponentFixture<DialogOrderByCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogOrderByCustomerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogOrderByCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
