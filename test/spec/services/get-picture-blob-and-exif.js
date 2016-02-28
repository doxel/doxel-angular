'use strict';

describe('Service: getPictureBlobAndExif', function () {

  // load the service's module
  beforeEach(module('doxelApp'));

  // instantiate service
  var getPictureBlobAndExif;
  beforeEach(inject(function (_getPictureBlobAndExif_) {
    getPictureBlobAndExif = _getPictureBlobAndExif_;
  }));

  it('should do something', function () {
    expect(!!getPictureBlobAndExif).toBe(true);
  });

});
