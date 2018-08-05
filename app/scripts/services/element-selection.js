/*
 * element-selection.js
 *
 * Copyright (c) 2015-2018 ALSENET SA - http://doxel.org
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
  .service('elementSelection', ['$rootScope', function ($rootScope) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var self=this;

    angular.extend(self,{
      selection: {},
      filter: {},

      list: function(type) {
        if (self.selection[type]===undefined) {
          self.selection[type]=[];
        }
        return self.selection[type];
      },

      isSelected: function(type,elem) {
        if (self.filter[type]) {
          return self.filter[type](elem);

        } else {
          return self.selection[type] && (self.selection[type].some(function(_el){return _el.id==elem.id}));
        }
      },

      replace: function(type,elem){
        var self=this;
        var alreadySelected;

        self.list(type).forEach(function(el){
          if (elem.id==el.id) {
            alreadySelected=true;
          } else {
            self.remove(type,el);
          }

        });

        self.selection[type].splice(0,self.selection[type].length,elem);
        elem.selected=true;
        $rootScope.$broadcast(type+'.selection.change',elem);
      },

      add: function(type,elem) {
        var list=self.list(type);
        if (!list.some(function(_el){return _el.id==elem.id})){
          list.push(elem);
          elem.selected=true;
          $rootScope.$broadcast(type+'.selection.change',elem);
        }
      },

      remove: function(type,elem) {
        if (self.selection[type]===undefined) {
          elem.selected=false;
          return;
        }
        var index=-1;
        var list=self.selection[type];
        list.some(function(_el,_index){
          if (_el.id==elem.id) {
            index=_index;
            return true;
          }
        })
        if (index>=0) {
          list.splice(index,1);
        }
        elem.selected=false;
        $rootScope.$broadcast(type+'.selection.change',elem);
      },

      set: function(type,elem,selected){
        if (selected) {
          self.add(type,elem);
        } else {
          self.remove(type,elem);
        }
      }

    });
  }]);
