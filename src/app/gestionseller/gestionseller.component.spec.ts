import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionsellerComponent } from './gestionseller.component';

describe('GestionsellerComponent', () => {
  let component: GestionsellerComponent;
  let fixture: ComponentFixture<GestionsellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionsellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionsellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
