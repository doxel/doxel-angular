'use strict';

describe('Filter: formatTimestamp', function () {

  // load the filter's module
  beforeEach(module('doxelApp'));

  // initialize a new instance of the filter before each test
  var formatTimestamp;
  beforeEach(inject(function ($filter) {
    formatTimestamp = $filter('formatTimestamp');
  }));

  it('should return the input prefixed with "formatTimestamp filter:"', function () {
    var text = 'angularjs';
    expect(formatTimestamp(text)).toBe('formatTimestamp filter: ' + text);
  });

});
