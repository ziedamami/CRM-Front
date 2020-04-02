import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellersidebarComponent } from './sellersidebar.component';

describe('SellersidebarComponent', () => {
  let component: SellersidebarComponent;
  let fixture: ComponentFixture<SellersidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellersidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellersidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
