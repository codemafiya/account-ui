import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PwrComponent } from './pwr.component';

describe('PwrComponent', () => {
  let component: PwrComponent;
  let fixture: ComponentFixture<PwrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PwrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PwrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
