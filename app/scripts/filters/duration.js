angular.module('doxelApp').filter('duration', function() {
  var duration=function duration(ms) {
    return moment.duration(ms).humanize();
  }
  duration.$stateful=true;
  return duration;
});
