'use strict';

/**
 * @ngdoc filter
 * @name doxelApp.filter:formatTimestamp
 * @function
 * @description
 * # formatTimestamp
 * Filter in the doxelApp.
 */
angular.module('doxelApp')
  .filter('formatTimestamp', function () {
    var formatter={
      month: new Intl.DateTimeFormat(navigator.language, {
        month: 'long'
      }),
      day:  new Intl.DateTimeFormat(navigator.language, {
        weekday: 'long'
      })
    }
    return function (timestamp,format) {
      var date=new Date(Number(timestamp.substr(0,10)+'000'));
      var mm=date.getMonth()+1;
      var dd=date.getDate();
      var hh=date.getHours();
      var mi=date.getMinutes();
      var ss=date.getSeconds();
      if (mm<10) mm='0'+mm;
      if (dd<10) dd='0'+dd;
      if (hh<10) hh='0'+hh;
      if (mi<10) mi='0'+mi;
      if (ss<10) ss='0'+ss;
      switch(format) {
        case 'hms':
          return hh+':'+mi+':'+ss;
        case 'locale':
        console.log(timestamp)
          return date.getFullYear()+' '+formatter.month.format(date)+' '+dd+' '+formatter.day.format(date);
        case 'ymdhms':
          return date.getFullYear()+'/'+mm+'/'+dd+', '+hh+':'+mi+':'+ss;
        default:
          return date.getFullYear()+'/'+mm+'/'+dd;
      }
    };
  });
