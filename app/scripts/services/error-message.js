'use strict';

/**
 * @ngdoc service
 * @name doxelApp.errorMessage
 * @description
 * # errorMessage
 * Service in the doxelApp.
 */
angular.module('doxelApp')
  .service('errorMessage', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function

    this.show=function(options){
      if (typeof(options)=="string") {
        err=options;

      } else {
        var scope=options.scope;
        var err=options.err;
      }

      if (!err && scope) {
        for(var err in scope.error) {
          if (!scope.error.hasOwnProperty(err) || !scope.error[err].field) {
            continue;
          }
          options.form[scope.error[err].field].$setValidity(err,true);
        }
        return;
      }

      if (scope && scope.error[err] && scope.error[err].field) {
        var field=scope.error[err].field;
        options.form[field].$setValidity(err,false);
        scope.hideMessages=false;
        setTimeout(function(){
          scope.hideMessages=true;
          scope.$apply();
        },3000);

      } else {
        var title=scope && (scope.error[err] && scope.error[err].title || err) || "Something did not work";
        var message=scope && (scope.error[err] && scope.error[err].msg || 'Unexpected error.') || err;
        BootstrapDialog.show({
          title: title,
          size: BootstrapDialog.SIZE_SMALL,
          buttons: [{
            label: 'OK',
            action: function(){
              this.dialog.close();
            }
          }],
          message: message
        });
      }

    }
  });
