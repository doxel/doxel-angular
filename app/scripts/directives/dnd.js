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

        function closest(property){
          var parent=scope.$parent;
          while(parent) {
            if (parent[property]) {
              return parent[property];
            }
            parent=parent.$parent;
          }
        }

        // dragevent handlers can be specified as attributes or defined in a parent scope
        scope.onDragStart=(attrs.onDragStart) ? $parse(attrs.onDragStart) : closest('dragStart')||log;
        scope.onDragEnter=(attrs.onDragEnter) ? $parse(attrs.onDragEnter) : closest('dragEnter')||log;
        scope.onDragOver=(attrs.onDragOver) ? $parse(attrs.onDragOver) : closest('dragOver')||log;
        scope.onDragLeave=(attrs.onDragLeave) ? $parse(attrs.onDragLeave) : closest('dragLeave')||log;
        scope.onDrop=(attrs.onDrop) ? $parse(attrs.onDrop) : closest('drop')||log;
        scope.onDragEnd=(attrs.onDragEnd) ? $parse(attrs.onDragEnd) : closest('dragEnd')||log;

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
          if (dndService.sameWindowOnly) {
            enableDragEvents(false);
          }
          dndService.targets=null;
        }

        function ondragstart(e) {
          cleanup();
          dndService.fromElement=$(e.currentTarget)
          dndService.toElement=null;
          dndService.targets=$(scope.targets).not(dndService.fromElement);
          if (scope.onDragStart(scope,{$event: e})===false) {
            return false;
          }
          enableDragEvents(true);

          dndService.fromElement.addClass('dndDragging');
          dndService.targets.addClass('dndValidTarget');
          dndService.fromElement.closest('.dndValidTarget').remove('dndValidTarget');
        }

        function ondragover(e) {
          var elem=$(e.currentTarget);
          // prevent default to allow drop
          if (e.preventDefault) {
            e.preventDefault();
          }
          // ignore invalid targets
          if (!elem.hasClass('dndDragover')) {
            return false;
          }
          if (scope.onDragOver(scope,{$event: e})===false) {
            return false;
          }
          return false;
        }

        function ondragenter(e) {
          var elem=$(e.currentTarget);

          if (!elem.is('[dnd]')) {
            elem=elem.find('[dnd]:first');
          }

          // ignore source element or invalid targets
          if (elem.hasClass('dndDragging') || !elem.closest('.dndValidTarget').length || elem.find('.dndDragging').length) {
            return false;
          }
          // dragleave event being triggered after dragenter,
          // when the currentTarget is already the drop target
          // only increase the dragenterCount
          if (elem.hasClass('dndDragover')) {
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

          if (!elem.is('[dnd]')) {
            elem=elem.find('[dnd]:first');
          }

          // dragleave event being triggered after dragenter, do nothing
          // if we we already entered another drop target or
          // the dragenterCount for the current target is non-null.
          if (!elem.hasClass('dndDragover') || --dndService.dragenterCount) {
            return false;
          }
          if (scope.onDragLeave(scope,{$event: e})===false) {
            return false;
          }
          dndService.toElement=null;
          elem.removeClass('dndDragover');
        }

        function ondrop(e) {
          var elem=$(e.currentTarget);
          if (e.preventDefault) {
            e.preventDefault();
          }

          if (!elem.is('[dnd]')) {
            elem=elem.find('[dnd]:first');
          }

          // ignore on source element or invalid targets
          if (elem.hasClass('dndDragging') || !elem.closest('.dndValidTarget').length || elem.find('.dndDragging').length) {
            return false;
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

        function enableDragEvents(enable) {
          if (enable) {
            $('.dnd-target')
            .not('.dnd-events')
            .on('dragover.dnd',ondragover)
            .on('dragenter.dnd',ondragenter)
            .on('dragleave.dnd',ondragleave)
            .on('drop.dnd',ondrop)
            .addClass('dnd-events');

          } else {
            $('.dnd-events').off('.dnd');
          }

        }

        $element[0].draggable=true;
        $element.on('dragstart',ondragstart);
        $element.on('dragend',ondragend);
        if (!dndService.sameWindowOnly) {
          enableDragEvents(true);
        }
      }
    };
  });
