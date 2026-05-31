import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialLotRow } from './material-lot-row';

describe('MaterialLotRow', () => {
  let component: MaterialLotRow;
  let fixture: ComponentFixture<MaterialLotRow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialLotRow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialLotRow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
