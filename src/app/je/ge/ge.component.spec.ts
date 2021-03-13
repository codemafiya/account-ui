import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeComponent } from './ge.component';

describe('GeComponent', () => {
  let component: GeComponent;
  let fixture: ComponentFixture<GeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
