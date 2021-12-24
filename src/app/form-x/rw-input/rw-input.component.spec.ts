import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RwInputComponent } from './rw-input.component';

describe('RwInputComponent', () => {
  let component: RwInputComponent;
  let fixture: ComponentFixture<RwInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RwInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RwInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
