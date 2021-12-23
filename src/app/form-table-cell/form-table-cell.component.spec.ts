import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTableCellComponent } from './form-table-cell.component';

describe('FormTableCellComponent', () => {
  let component: FormTableCellComponent;
  let fixture: ComponentFixture<FormTableCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormTableCellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTableCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
