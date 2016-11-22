'use strict';

describe('Filter: humanize', function () {

  // load the filter's module
  beforeEach(module('doxelApp'));

  // initialize a new instance of the filter before each test
  var humanize;
  beforeEach(inject(function ($filter) {
    humanize = $filter('humanize');
  }));

  it('should return the input prefixed with "humanize filter:"', function () {
    var text = 'angularjs';
    expect(humanize(text)).toBe('humanize filter: ' + text);
  });

});
