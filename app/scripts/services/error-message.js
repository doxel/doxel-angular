/*
 * error-message.js
 *
 * Copyright (c) 2015-2016 ALSENET SA - http://doxel.org
 * Please read <http://doxel.org/license> for more information.
 *
 * Author(s):
 *
 *      Luc Deschenaux <luc.deschenaux@freesurf.ch>
 *
 * This file is part of the DOXEL project <http://doxel.org>.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * Additional Terms:
 *
 *      You are required to preserve legal notices and author attributions in
 *      that material or in the Appropriate Legal Notices displayed by works
 *      containing it.
 *
 *      You are required to attribute the work as explained in the "Usage and
 *      Attribution" section of <http://doxel.org/license>.
 */

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
