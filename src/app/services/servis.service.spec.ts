/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ServisService } from './servis.service';

describe('Service: Servis', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServisService]
    });
  });

  it('should ...', inject([ServisService], (service: ServisService) => {
    expect(service).toBeTruthy();
  }));
});
