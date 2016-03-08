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
  .directive('dnd', function ($parse) {
    return {
      restrict: 'A',
      replace: false,
      scope: true,
      link: function postLink(scope, $element, attrs) {
        scope.onDragStart=(attrs.onDragStart)?$parse(attrs.onDragStart):function(scope,e){console.log(e.$event)};
        scope.onDragEnter=(attrs.onDragEnter)?$parse(attrs.onDragEnter):function(scope,e){console.log(e.$event)};
        scope.onDragOver=(attrs.onDragOver)?$parse(attrs.onDragOver):function(scope,e){return;console.log(e.$event)};
        scope.onDragLeave=(attrs.onDragLeave)?$parse(attrs.onDragLeave):function(scope,e){console.log(e.$event)};
        scope.onDrop=(attrs.onDrop)?$parse(attrs.onDrop):function(scope,e){console.log(e.$event)};
        scope.onDragEnd=(attrs.onDragEnd)?$parse(attrs.onDragEnd):function(scope,e){console.log(e.$event)};

        scope.dragOverClass=scope.dndDragoverClass||'dragover';
        scope.selector= (attrs.dndSelector)?attrs.dndSelector:$element[0].tagName.toLowerCase();
        scope.dndChildren= (attrs.dndChildren)?attrs.dndChildren:$element[0].tagName.toLowerCase()+' div';

    /*
        var $rootScope=(function(scope){
          while(scope.$parent) {
            scope=scope.$parent;
          }
          return scope;
        })(scope);
*/

        function removeDragover() {
          $('.'+scope.dragOverClass).removeClass(scope.dragOverClass);
        }

        function setDragover(elem) {
          removeDragover();
          $(elem).addClass(scope.dragOverClass);
        }

        function removeDragging() {
          $('.dragging').removeClass('dragging');
        }

        function cleanup() {
          removeDragover();
          removeDragging();
          disabled.forEach(function(elem){
            elem.css('pointer-events','');
          });
          disabled=[];
        }

        function getDraggableElem(elem) {
          return $(elem).closest(scope.selector);
        }

        var disabled=[]
        function disablePointerEvents(elem,disable){
          var ok;
          var index=disabled.indexOf(elem);
          if (index>=0) {
            if (disable) {
              ok=true;
            } else {
              disabled.split(index,1);
            }
          }
          if (!ok) {
            disabled.push(elem);
          }
          $(scope.dndChildren).css('pointer-events',((disable)?'none':''));
        }

        // dragndrop event handlers

        function ondragstart(e) {
          cleanup();
          if (scope.onDragStart(scope,{$event: e})===false) {
            return;
          }
          var elem=getDraggableElem(e.target).addClass('dragging');
          disablePointerEvents(elem,true);
        }

        function ondragover(e) {
          if (scope.onDragOver(scope,{$event: e})===false) {
            return false;
          }
          if (e.preventDefault) e.preventDefault();
          return false;
        }

        function ondragenter(e) {
          if (scope.onDragEnter(scope,{$event: e})===false) {
            return false;
          }
          if (e.preventDefault) e.preventDefault();
          var elem=getDraggableElem(e.originalEvent.toElement);
          if (!elem.hasClass('dragging')) {
              setDragover(elem);
          }
        }

        function ondragleave(e) {
          if (scope.onDragLeave(scope,{$event: e})===false) {
            return false;
          }
          getDraggableElem(e.originalEvent.toElement)
          .removeClass(scope.dragOverClass);
        }

        function ondrop(e) {
          if (e.preventDefault) e.preventDefault();
          var elem=getDraggableElem(e.originalEvent.toElement);
          if (elem.hasClass(scope.dragOverClass)) {
            if (scope.onDrop(scope,{$event: e})===false) {
              return;
            }
          }
        }

        function ondragend(e) {
          if (scope.onDragEnd(scope,{$event: e})===false) {
            return;
          }
          cleanup();
        }

        $element[0].draggable=scope.dnd?'true':'false';
        $element.on('dragstart',ondragstart);
        $element.on('dragover',ondragover);
        $element.on('dragenter',ondragenter);
        $element.on('dragleave',ondragleave);
        $element.on('drop',ondrop);
        $element.on('dragend',ondragend);
      }
    };
  });
