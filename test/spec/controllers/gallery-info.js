'use strict';

describe('Controller: GalleryInfoCtrl', function () {

  // load the controller's module
  beforeEach(module('doxelApp'));

  var GalleryInfoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GalleryInfoCtrl = $controller('GalleryInfoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(GalleryInfoCtrl.awesomeThings.length).toBe(3);
  });
});
