'use strict';

describe('Directive: picturePreview', function () {

  // load the directive's module
  beforeEach(module('doxelApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<picture-preview></picture-preview>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the picturePreview directive');
  }));
});
