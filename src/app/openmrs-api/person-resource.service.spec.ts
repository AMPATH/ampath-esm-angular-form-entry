
import { TestBed, async } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { PersonResourceService } from './person-resource.service';
import { OpenmrsApiModule } from './openmrs-api.module';

// Load the implementations that should be tested

describe('PersonResourceService', () => {
  let service: PersonResourceService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        OpenmrsApiModule
      ],
      declarations: [],
      providers: [],
    });

    service = TestBed.get(PersonResourceService);
    httpMock = TestBed.get(HttpTestingController);

  }));

  afterEach(() => {
    httpMock.verify();
    TestBed.resetTestingModule();
  });

  const personuid = 'uuid';
  it('should be injected with all dependencies', () => {
    expect(service).toBeDefined();
  });

  it('should return a person when the correct uuid is provided without v', (done) => {
    service.getPersonByUuid(personuid)
      .subscribe((response) => {
        expect(req.request.urlWithParams).toContain(`person/${personuid}?v=full`);
        expect(req.request.method).toBe('GET');
        done();
      });
    const req = httpMock.expectOne(`${service.getUrl()}/${personuid}?v=full`);
    req.flush(JSON.stringify({}));
  });

  it('should return a person when the correct uuid is provided with v', (done) => {
    service.getPersonByUuid(personuid, '9')
      .subscribe((response) => {
        expect(req.request.urlWithParams).toContain(`person/${personuid}?v=9`);
        expect(req.request.method).toBe('GET');
        done();
      });
    const req = httpMock.expectOne(`${service.getUrl()}/${personuid}?v=9`);
    req.flush(JSON.stringify({}));
  });

});

