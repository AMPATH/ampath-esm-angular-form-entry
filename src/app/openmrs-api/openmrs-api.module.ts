import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { FormResourceService } from './form-resource.service';
import { OpenmrsEsmApiService } from './openmrs-esm-api.service';
import { PersonResourceService } from './person-resource.service';
import { ProviderResourceService } from './provider-resource.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    FormResourceService,
    OpenmrsEsmApiService,
    PersonResourceService,
    ProviderResourceService
  ]
})
export class OpenmrsApiModule { }
