import { TestBed, async, inject } from '@angular/core/testing';

import { RoutegGuard } from './routeg.guard';

describe('RoutegGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoutegGuard]
    });
  });

  it('should ...', inject([RoutegGuard], (guard: RoutegGuard) => {
    expect(guard).toBeTruthy();
  }));
});
