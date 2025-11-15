import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseCreateEdit } from './purchase-create-edit';

describe('PurchaseCreateEdit', () => {
  let component: PurchaseCreateEdit;
  let fixture: ComponentFixture<PurchaseCreateEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseCreateEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseCreateEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
