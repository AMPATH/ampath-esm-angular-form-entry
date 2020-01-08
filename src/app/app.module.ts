import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmptyRouteComponent } from './empty-route/empty-route.component';
import { FeWrapperComponent } from './fe-wrapper/fe-wrapper.component';
import { FormEntryModule } from '@ampath-kenya/ngx-openmrs-formentry/dist/ngx-formentry';
import { ReactiveFormsModule } from '@angular/forms';
import { OpenmrsApiModule } from './openmrs-api/openmrs-api.module';
import { FormSchemaService } from './form-schema/form-schema.service';
import { LocalStorageService } from './local-storage/local-storage.service';

@NgModule({
  declarations: [
    AppComponent,
    EmptyRouteComponent,
    FeWrapperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormEntryModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    OpenmrsApiModule
  ],
  providers: [
    FormSchemaService,
    LocalStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
