import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTableRowComponent } from './form-table-row.component';

describe('FormTableRowComponent', () => {
  let component: FormTableRowComponent;
  let fixture: ComponentFixture<FormTableRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormTableRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
