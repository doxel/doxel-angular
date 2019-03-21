angular.module('doxelApp').filter('fromNow', function() {
  var fromNow=function fromNow(date) {
    return moment(date).fromNow();
  }
  fromNow.$stateful=true;
  return fromNow;
});
