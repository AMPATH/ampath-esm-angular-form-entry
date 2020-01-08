import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { FormResourceService } from './form-resource.service';
import { OpenmrsEsmApiService } from './openmrs-esm-api.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    FormResourceService,
    OpenmrsEsmApiService
  ]
})
export class OpenmrsApiModule { }
