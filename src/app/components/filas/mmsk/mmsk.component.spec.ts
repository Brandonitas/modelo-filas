import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MmskComponent } from './mmsk.component';

describe('MmskComponent', () => {
  let component: MmskComponent;
  let fixture: ComponentFixture<MmskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MmskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MmskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
