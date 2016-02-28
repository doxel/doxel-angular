'use strict';

describe('Directive: segmentStatus', function () {

  // load the directive's module
  beforeEach(module('doxelApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<segment-status></segment-status>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the segmentStatus directive');
  }));
});
