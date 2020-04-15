import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketSuccessComponent } from './basket-success.component';

describe('BasketSuccessComponent', () => {
  let component: BasketSuccessComponent;
  let fixture: ComponentFixture<BasketSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasketSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
