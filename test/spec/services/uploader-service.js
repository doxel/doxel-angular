'use strict';

describe('Service: uploaderService', function () {

  // load the service's module
  beforeEach(module('doxelApp'));

  // instantiate service
  var uploaderService;
  beforeEach(inject(function (_uploaderService_) {
    uploaderService = _uploaderService_;
  }));

  it('should do something', function () {
    expect(!!uploaderService).toBe(true);
  });

});
