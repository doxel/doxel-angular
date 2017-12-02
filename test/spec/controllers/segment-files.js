'use strict';

describe('Controller: SegmentFilesCtrl', function () {

  // load the controller's module
  beforeEach(module('doxelApp'));

  var SegmentFilesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SegmentFilesCtrl = $controller('SegmentFilesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SegmentFilesCtrl.awesomeThings.length).toBe(3);
  });
});
