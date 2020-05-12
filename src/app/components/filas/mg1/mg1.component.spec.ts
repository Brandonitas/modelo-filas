import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mg1Component } from './mg1.component';

describe('Mg1Component', () => {
  let component: Mg1Component;
  let fixture: ComponentFixture<Mg1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mg1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mg1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
