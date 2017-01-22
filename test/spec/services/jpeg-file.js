'use strict';

describe('Service: jpegFile', function () {

  // load the service's module
  beforeEach(module('doxelApp'));

  // instantiate service
  var jpegFile;
  beforeEach(inject(function (_jpegFile_) {
    jpegFile = _jpegFile_;
  }));

  it('should do something', function () {
    expect(!!jpegFile).toBe(true);
  });

});
