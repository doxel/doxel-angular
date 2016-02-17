'use strict';

describe('Controller: SegmentsCtrl', function () {

  // load the controller's module
  beforeEach(module('doxelApp'));

  var SegmentsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SegmentsCtrl = $controller('SegmentsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SegmentsCtrl.awesomeThings.length).toBe(3);
  });
});
