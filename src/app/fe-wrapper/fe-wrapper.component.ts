import { Component, OnInit } from '@angular/core';
import { getCurrentPatient } from '@openmrs/esm-api';

import { FormGroup } from '@angular/forms';
import {
  QuestionFactory, FormFactory, ObsValueAdapter, OrderValueAdapter,
  EncounterAdapter, DataSources, EncounterPdfViewerService, FormErrorsService, Form
} from '@ampath-kenya/ngx-openmrs-formentry/dist/ngx-formentry';

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
    getCurrentPatient().subscribe((patient) => {
      console.log('patient', patient);
    });
    // console.log('function', getCurrentPatient);
    this.form = this.formFactory.createForm(this.schema, this.dataSources.dataSources);

  }

  public onSubmit(event: any) {

  }
}
