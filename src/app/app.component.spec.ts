import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { FeWrapperComponent } from './fe-wrapper/fe-wrapper.component';
import { FormEntryModule } from '@ampath-kenya/ngx-openmrs-formentry/dist/ngx-formentry';
import { ReactiveFormsModule } from '@angular/forms';
import { FormSchemaService } from './form-schema/form-schema.service';
import { OpenmrsApiModule } from './openmrs-api/openmrs-api.module';
import { LocalStorageService } from './local-storage/local-storage.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormEntryModule,
        ReactiveFormsModule,
        OpenmrsApiModule
      ],
      declarations: [
        AppComponent,
        FeWrapperComponent
      ],
      providers: [
        FormSchemaService,
        LocalStorageService
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
