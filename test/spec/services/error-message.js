'use strict';

describe('Service: errorMessage', function () {

  // load the service's module
  beforeEach(module('doxelApp'));

  // instantiate service
  var errorMessage;
  beforeEach(inject(function (_errorMessage_) {
    errorMessage = _errorMessage_;
  }));

  it('should do something', function () {
    expect(!!errorMessage).toBe(true);
  });

});
