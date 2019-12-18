import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FeWrapperComponent } from './fe-wrapper.component';
import { FormEntryModule } from '@ampath-kenya/ngx-openmrs-formentry/dist/ngx-formentry';
import { ReactiveFormsModule } from '@angular/forms';
import { OpenmrsApiService } from './openmrs-api.service';
import { of } from 'rxjs';

describe('FeWrapperComponent', () => {
  let component: FeWrapperComponent;
  let fixture: ComponentFixture<FeWrapperComponent>;
  // let openmrsServiceSpy: any;

  const openmrsApiStub = {
    getCurrentPatient: () => {
      return of(null);
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeWrapperComponent ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormEntryModule,
        ReactiveFormsModule
      ],
      providers: [
        {
          provide: OpenmrsApiService,
          useValue: openmrsApiStub
        }
      ]
      // schemas: [NO_ERRORS_SCHEMA]
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
