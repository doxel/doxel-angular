'use strict';

describe('Controller: GalleryViewerCtrl', function () {

  // load the controller's module
  beforeEach(module('doxelApp'));

  var GalleryViewerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GalleryViewerCtrl = $controller('GalleryViewerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(GalleryViewerCtrl.awesomeThings.length).toBe(3);
  });
});
