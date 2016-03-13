/*
 * dnd.js
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
 * @ngdoc directive
 * @name doxelApp.directive:dnd
 * @description
 * # dnd
 */
angular.module('doxelApp')
  .directive('dnd', function ($parse,dndService,$timeout) {
    return {
      restrict: 'A',
      replace: false,
      scope: true,
      link: function postLink(scope, $element, attrs) {
        var log=function(scope,options){console.log(options.$event)};
        log=scope.$parent.dndDebug ? scope.$parent.dndLog||log : function(){};

        // dragevent handlers can be specified as attributes or defined in the parent scope
        scope.onDragStart=(attrs.onDragStart) ? $parse(attrs.onDragStart) : scope.$parent.dragStart||log;
        scope.onDragEnter=(attrs.onDragEnter) ? $parse(attrs.onDragEnter) : scope.$parent.dragEnter||log;
        scope.onDragOver=(attrs.onDragOver) ? $parse(attrs.onDragOver) : scope.$parent.dragOver||log;
        scope.onDragLeave=(attrs.onDragLeave) ? $parse(attrs.onDragLeave) : scope.$parent.dragLeave||log;
        scope.onDrop=(attrs.onDrop) ? $parse(attrs.onDrop) : scope.$parent.drop||log;
        scope.onDragEnd=(attrs.onDragEnd) ? $parse(attrs.onDragEnd) : scope.$parent.dragEnd||log;

        // - valid targets selector(s) can be specified with attribute 'dndTargets'
        // - the default value is the draggable element tagName
        // - on dragstart, the class "dndValidTarget" will be added to the matching elements
        scope.targets=(attrs.dndTargets)  ? attrs.dndTargets : $element[0].tagName.toLowerCase();

        function setDragover(elem) {
          $('.dndDragover').removeClass('dndDragover');
          $(elem).addClass('dndDragover');
        }

        function cleanup() {
          $('.dndDragover').removeClass('dndDragover');
          $('.dndDragging').removeClass('dndDragging');
          $('.dndValidTarget').removeClass('dndValidTarget');
        }

        function ondragstart(e) {
          cleanup();
          dndService.fromElement=$(e.currentTarget).addClass('dndDragging');
          dndService.toElement=null;
          if (scope.onDragStart(scope,{$event: e})===false) {
            return;
          }
          $(scope.targets).addClass('dndValidTarget');
        }

        function ondragover(e) {
          if (scope.onDragOver(scope,{$event: e})===false) {
            return false;
          }
          return false;
        }

        function ondragenter(e) {
          var elem=$(e.currentTarget);
          if (!elem.hasClass('dndValidTarget')) {
            return;
          }
          // dragleave event being triggered after dragenter,
          // when the currentTarget is already the drop target
          // only increase the dragenterCount
          if (elem.hasClass(scope.dragOverClass)) {
            ++dndService.dragenterCount;

          } else {
            if (scope.onDragEnter(scope,{$event: e})===false) {
              return false;
            }
            dndService.toElement=elem;
            dndService.dragenterCount=1;
            setDragover(dndService.toElement);
          }
        }

        function ondragleave(e) {
          var elem=$(e.currentTarget);
          // dragleave event being triggered after dragenter, do nothing
          // if we we already entered another drop target or
          // the dragenterCount for the current target is non-null.
          if (!elem.hasClass(scope.dragOverClass) || --dndService.dragenterCount) {
            return;
          }
          if (scope.onDragLeave(scope,{$event: e})===false) {
            return false;
          }
          dndService.toElement=null;
          elem.removeClass('dndDragover');
        }

        function ondrop(e) {
          var elem=$(e.currentTarget);
          // no drop on source element or invalid targets
          if (elem.hasClass('dndDragging') || !elem.hasClass('dndValidTarget')) {
            return;
          }
          if (e.preventDefault) {
            e.preventDefault();
          }
          if (scope.onDrop(scope,{$event: e})===false) {
            return;
          }
        }

        function ondragend(e) {
          cleanup();
          if (scope.onDragEnd(scope,{$event: e})===false) {
            return;
          }
        }

        $element[0].draggable=true;
        $element.on('dragstart',ondragstart);
        $element.on('dragover',ondragover);
        $element.on('dragenter',ondragenter);
        $element.on('dragleave',ondragleave);
        $element.on('drop',ondrop);
        $element.on('dragend',ondragend);
      }
    };
  });
