import { Component, OnInit } from '@angular/core';


import { FormGroup } from '@angular/forms';
import {
  QuestionFactory, FormFactory, ObsValueAdapter, OrderValueAdapter,
  EncounterAdapter, DataSources, EncounterPdfViewerService, FormErrorsService, Form
} from '@ampath-kenya/ngx-openmrs-formentry/dist/ngx-formentry';
import { OpenmrsEsmApiService } from '../openmrs-api/openmrs-esm-api.service';
import { FormSchemaService } from '../form-schema/form-schema.service';

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

  constructor(
    private openmrsApi: OpenmrsEsmApiService,
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
    const formUuid = this.getFormUuidFromUrl();
    this.launchForm(formUuid);
  }

  public getFormUuidFromUrl() {
    const match = /\/formentry\/([a-zA-Z0-9\-]+)\/?/.exec(location.pathname);
    return match && match[1];
  }

  public launchForm(uuid: string) {
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
    // TODO: Implement form saving
    console.log('Saving form..');
  }

  public onCancel() {
    // TODO: confirm cancelation
    this.navigateToPatientChart();
  }

  public navigateToPatientChart() {

  }
}
