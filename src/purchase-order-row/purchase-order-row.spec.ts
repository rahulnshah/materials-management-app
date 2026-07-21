import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderRow } from './purchase-order-row';

describe('PurchaseOrderRow', () => {
  let component: PurchaseOrderRow;
  let fixture: ComponentFixture<PurchaseOrderRow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseOrderRow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseOrderRow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
