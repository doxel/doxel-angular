/*
 * element-selection.js
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
 * @name doxelApp.elementSelection
 * @description
 * # elementSelection
 * Service in the doxelApp.
 */
angular.module('doxelApp')
  .service('elementSelection', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var self=this;
    this.selection={};

    this.replace=function(type,elem){
      var alreadySelected;

      if (self.selection[type]===undefined) {
        self.selection[type]=[];

      } else {
        self.selection[type].forEach(function(el){
          if (el==elem) {
            alreadySelected=true;

          } else {
            el.removeClass('selected');
          }
        });
      }
      self.selection[type]=[elem];
      elem.addClass('selected');
    }

    this.add=function(type,elem) {
      if (self.selection[type]===undefined) {
        self.selection[type]=[];
      }
      if (self.selection[type].indexOf(elem)<0) {
        self.selection[type].push(elem);
      }
    }

    this.remove=function(type,elem) {
      if (self.selection[type]===undefined) {
        return;
      }
      var index=self.selection[type].indexOf(elem);
      if (index>=0) {
        self.selection[type].splice(index,1);
      }
    }

  });
