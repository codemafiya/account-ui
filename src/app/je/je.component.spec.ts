import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JeComponent } from './je.component';

describe('JeComponent', () => {
  let component: JeComponent;
  let fixture: ComponentFixture<JeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
