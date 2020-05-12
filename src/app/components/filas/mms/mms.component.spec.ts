import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MmsComponent } from './mms.component';

describe('MmsComponent', () => {
  let component: MmsComponent;
  let fixture: ComponentFixture<MmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
