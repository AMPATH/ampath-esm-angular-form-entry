import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class OpenmrsEsmApiService {

  constructor() { }

  public getCurrentPatient(): Observable<any> {
    // HACK: Required to enable unit tests to run
    const backend = require('@openmrs/esm-api');
    return backend.getCurrentPatient();
  }
}
