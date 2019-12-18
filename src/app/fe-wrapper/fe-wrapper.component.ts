import { Component, OnInit } from '@angular/core';


import { FormGroup } from '@angular/forms';
import {
  QuestionFactory, FormFactory, ObsValueAdapter, OrderValueAdapter,
  EncounterAdapter, DataSources, EncounterPdfViewerService, FormErrorsService, Form
} from '@ampath-kenya/ngx-openmrs-formentry/dist/ngx-formentry';
import { OpenmrsApiService } from './openmrs-api.service';

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
  stack = [];
  encounterObject = adultFormObs;

  constructor(
    private openmrsApi: OpenmrsApiService,
    private questionFactory: QuestionFactory,
    private formFactory: FormFactory,
    private obsValueAdapater: ObsValueAdapter,
    private orderAdaptor: OrderValueAdapter,
    private encAdapter: EncounterAdapter,
    private dataSources: DataSources, private encounterPdfViewerService: EncounterPdfViewerService,
    private formErrorsService: FormErrorsService) {
    this.schema = adultForm;
    // console.log('Data >>>', adultForm, adultFormObs, formOrdersPayload);
  }

  ngOnInit() {
    this.createForm();
  }

  public createForm() {
    this.form = this.formFactory.createForm(this.schema, this.dataSources.dataSources);
    this.openmrsApi.getCurrentPatient().subscribe((patient) => {
      console.log('patient', patient);
    }, (error) => {
      console.error('An error occured while fetching patient', error);
    });
  }

  public onSubmit(event: any) {

  }
}
