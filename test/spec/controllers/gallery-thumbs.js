'use strict';

describe('Controller: GalleryThumbsCtrl', function () {

  // load the controller's module
  beforeEach(module('doxelApp'));

  var GalleryThumbsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GalleryThumbsCtrl = $controller('GalleryThumbsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(GalleryThumbsCtrl.awesomeThings.length).toBe(3);
  });
});
