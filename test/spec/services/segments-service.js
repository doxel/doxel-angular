'use strict';

describe('Service: segmentsService', function () {

  // load the service's module
  beforeEach(module('doxelApp'));

  // instantiate service
  var segmentsService;
  beforeEach(inject(function (_segmentsService_) {
    segmentsService = _segmentsService_;
  }));

  it('should do something', function () {
    expect(!!segmentsService).toBe(true);
  });

});
