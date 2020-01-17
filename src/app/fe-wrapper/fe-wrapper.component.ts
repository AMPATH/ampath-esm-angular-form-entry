import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import {
  QuestionFactory, FormFactory, ObsValueAdapter, OrderValueAdapter,
  EncounterAdapter, DataSources, FormErrorsService, Form
} from '@ampath-kenya/ngx-openmrs-formentry/dist/ngx-formentry';

import { OpenmrsEsmApiService } from '../openmrs-api/openmrs-esm-api.service';
import { FormSchemaService } from '../form-schema/form-schema.service';
import { FormDataSourceService } from '../form-data-source/form-data-source.service';
import { Observable, forkJoin, ReplaySubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { FormSubmissionService } from '../form-submission/form-submission.service';

@Component({
  selector: 'my-app-fe-wrapper',
  templateUrl: './fe-wrapper.component.html',
  styleUrls: ['./fe-wrapper.component.css']
})
export class FeWrapperComponent implements OnInit {
  data: any;
  sections: {} = {};
  formGroup: FormGroup;
  activeTab = 0;
  form: Form;
  formName: string;
  formUuid: string;
  formSchema: any;
  patient: any;

  constructor(
    private openmrsApi: OpenmrsEsmApiService,
    private formSchemaService: FormSchemaService,
    private questionFactory: QuestionFactory,
    private formFactory: FormFactory,
    private obsValueAdapater: ObsValueAdapter,
    private orderAdaptor: OrderValueAdapter,
    private encAdapter: EncounterAdapter,
    private dataSources: DataSources,
    private formDataSourceService: FormDataSourceService,
    private formSubmissionService: FormSubmissionService,
    private formErrorsService: FormErrorsService) {

  }

  ngOnInit() {
    this.launchForm()
      .subscribe((form) => {
        // console.log('Form loaded and rendered', form);
      }, (err) => {
        // TODO: Handle errors
        console.error('Error rendering form', err);
      });
  }

  public onSubmit(event: any) {
    if (this.isFormvalid()) {
      this.saveForm()
        .subscribe(
          response => {
            // TODO: Handle Successful
            console.log('Form submitted', response);
          }, error => {
            console.error('Error submitting form', error);
          });
    }
  }

  public onCancel() {
    // TODO: confirm cancelation
    this.navigateToPatientChart();
  }

  public getFormUuidFromUrl() {
    const match = /\/formentry\/([a-zA-Z0-9\-]+)\/?/.exec(location.pathname);
    return match && match[1];
  }

  public launchForm(uuid: string = null): Observable<Form> {
    const subject = new ReplaySubject<Form>(1);
    if (uuid === null) {
      this.formUuid = this.getFormUuidFromUrl();
    } else {
      this.formUuid = uuid;
    }

    this.loadAllFormDependencies()
      .pipe(take(1))
      .subscribe((data) => {
        this.createForm();
        subject.next(this.form);
      }, (err) => {
        subject.error(err);
      });
    return subject.asObservable();
  }

  private loadAllFormDependencies(): Observable<any> {
    const trackingSubject = new ReplaySubject<any>(1);
    const observableBatch: Array<Observable<any>> = [];
    observableBatch.push(this.fetchCompiledFormSchema(this.formUuid).pipe(take(1)));
    observableBatch.push(this.getCurrentPatient().pipe(take(1)));
    forkJoin(observableBatch)
      .subscribe((data: any) => {
        this.formSchema = data[0] || null;
        this.patient = data[1] || null;
        const formData = {
          formSchema: data[0],
          patient: data[1]
        };
        console.log('Loaded form dependencies', formData);
        trackingSubject.next(formData);
      }, (err) => {
        trackingSubject.error(new Error('There was an error fetching form data. Details: ' + err));
      }
      );

    return trackingSubject.asObservable();
  }

  private fetchCompiledFormSchema(uuid: string): Observable<any> {
    const subject = new ReplaySubject<any>(1);
    this.formSchemaService
      .getFormSchemaByUuid(uuid, true).pipe(take(1))
      .subscribe(formSchema => {
        // console.log('Loaded form schema', formSchema);
        subject.next(formSchema);
      }, error => {
        subject.error(new Error('Error fetching form schema. Details: ' + error));
      });
    return subject.asObservable();
  }

  private getCurrentPatient(): Observable<any> {
    return this.openmrsApi.getCurrentPatient();
  }

  private createForm() {
    this.wireDataSources();
    this.formName = this.formSchema.name;
    this.form = this.formFactory.createForm(this.formSchema, this.dataSources.dataSources);
    this.setUpPayloadProcessingInformation();
  }

  private wireDataSources() {
    this.dataSources.registerDataSource('location',
      this.formDataSourceService.getDataSources().location);
    this.dataSources.registerDataSource('provider',
      this.formDataSourceService.getDataSources().provider);
    this.dataSources.registerDataSource('drug',
      this.formDataSourceService.getDataSources().drug);
    this.dataSources.registerDataSource('problem',
      this.formDataSourceService.getDataSources().problem);
    this.dataSources.registerDataSource('personAttribute',
      this.formDataSourceService.getDataSources().location);
    this.dataSources.registerDataSource('conceptAnswers',
      this.formDataSourceService.getDataSources().conceptAnswers);

    // TODO: Fix the patient datasource object to work with FHIR
    // this.dataSources.registerDataSource('patient',
    //   this.formDataSourceService.getPatientObject(this.patient), true);
  }

  private setUpPayloadProcessingInformation() {
    this.form.valueProcessingInfo.personUuid = this.patient.id;
    this.form.valueProcessingInfo.patientUuid = this.patient.id;
    this.form.valueProcessingInfo.formUuid = this.formSchema.uuid;
    if (this.formSchema.encounterType) {
      this.form.valueProcessingInfo.encounterTypeUuid = this.formSchema.encounterType.uuid;
    } else {
      throw new Error('Please associate the form with an encounter type.');
    }
  }

  private navigateToPatientChart() {

  }

  // check validity of form
  private isFormvalid(): boolean {
    return this.form.valid;
  }

  private saveForm(): Observable<any> {
    return this.formSubmissionService.submitPayload(this.form);
  }
}
