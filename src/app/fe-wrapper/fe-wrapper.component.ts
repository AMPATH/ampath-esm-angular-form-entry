import { Component, OnInit } from '@angular/core';


import { FormGroup } from '@angular/forms';
import {
  QuestionFactory, FormFactory, ObsValueAdapter, OrderValueAdapter,
  EncounterAdapter, DataSources, EncounterPdfViewerService, FormErrorsService, Form
} from '@ampath-kenya/ngx-openmrs-formentry/dist/ngx-formentry';
import { OpenmrsApiService } from './openmrs-api.service';
import { FormSchemaService } from './form-schema.service';

declare var require: any;

const adultForm = require('./adult-1.4.json');
const adultFormObs = require('./obs.json');
const formOrdersPayload = require('./orders.json');

@Component({
  selector: 'my-app-fe-wrapper',
  templateUrl: './fe-wrapper.component.html',
  styleUrls: ['./fe-wrapper.component.css']
})
export class FeWrapperComponent implements OnInit {

  data: any;
  schema: any;
  sections: {} = {};
  formGroup: FormGroup;
  activeTab = 0;
  form: Form;
  formName: string;
  formUuid: string;
  stack = [];
  encounterObject = adultFormObs;

  constructor(
    private openmrsApi: OpenmrsApiService,
    private formSchemaService: FormSchemaService,
    private questionFactory: QuestionFactory,
    private formFactory: FormFactory,
    private obsValueAdapater: ObsValueAdapter,
    private orderAdaptor: OrderValueAdapter,
    private encAdapter: EncounterAdapter,
    private dataSources: DataSources, private encounterPdfViewerService: EncounterPdfViewerService,
    private formErrorsService: FormErrorsService) {

  }

  ngOnInit() {
    // this.createForm();
    const formUuid = this.getFormUuidFromUrl();
    this.lauchForm(formUuid);
  }

  public getFormUuidFromUrl() {
    const match = /\/formentry\/([a-zA-Z0-9\-]+)\/?/.exec(location.pathname);
    return match && match[1];
  }

  public lauchForm(uuid: string) {
    this.formSchemaService.getFormSchemaByUuid(uuid, true)
      .subscribe(formSchema => {
        this.schema = formSchema;
        this.createForm();
      }, error => {
        console.error(error);
      });
  }

  public createForm() {
    this.formName = this.schema.name;
    this.form = this.formFactory.createForm(this.schema, this.dataSources.dataSources);
    // TODO: subscribe to patient load events and inject patient to the form as a data dependency
    this.openmrsApi.getCurrentPatient().subscribe((patient) => {
      console.log('patient', patient);
    }, (error) => {
      console.error('An error occured while fetching patient', error);
    });
  }

  public onSubmit(event: any) {

  }
}
