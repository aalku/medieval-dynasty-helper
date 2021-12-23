import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormVerticalRowComponent } from './form-vertical-row.component';

describe('FormVerticalRowComponent', () => {
  let component: FormVerticalRowComponent;
  let fixture: ComponentFixture<FormVerticalRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormVerticalRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormVerticalRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
