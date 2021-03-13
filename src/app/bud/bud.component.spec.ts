import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudComponent } from './bud.component';

describe('BudComponent', () => {
  let component: BudComponent;
  let fixture: ComponentFixture<BudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
