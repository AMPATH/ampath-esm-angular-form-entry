import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeWrapperComponent } from './fe-wrapper.component';

describe('FeWrapperComponent', () => {
  let component: FeWrapperComponent;
  let fixture: ComponentFixture<FeWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
