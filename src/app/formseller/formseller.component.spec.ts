import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsellerComponent } from './formseller.component';

describe('FormsellerComponent', () => {
  let component: FormsellerComponent;
  let fixture: ComponentFixture<FormsellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
