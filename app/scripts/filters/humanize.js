'use strict';

/**
 * @ngdoc filter
 * @name doxelApp.filter:humanize
 * @function
 * @description https://gist.githubusercontent.com/maggiben/9457434/raw/e596a5b66dfc3e87d5a83d6a0e9e0e40764aa439/humanize.js
 * # humanize
 * Filter in the doxelApp.
 */
angular.module('doxelApp')
  .filter('humanize', function () {
    return function humanize(number) {
        if(number < 1000) {
            return number;
        }
        var si = ['K', 'M', 'G', 'T', 'P', 'H'];
        var exp = Math.floor(Math.log(number) / Math.log(1000));
        var result = number / Math.pow(1000, exp);
        result = (result % 1 > (1 / Math.pow(1000, exp - 1))) ? result.toFixed(2) : result.toFixed(0);
        return result + si[exp - 1];
    };

  });
