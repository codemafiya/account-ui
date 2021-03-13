import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwrComponent } from './cwr.component';

describe('CwrComponent', () => {
  let component: CwrComponent;
  let fixture: ComponentFixture<CwrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
