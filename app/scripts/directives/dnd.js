'use strict';

/**
 * @ngdoc directive
 * @name doxelApp.directive:dnd
 * @description
 * # dnd
 */
angular.module('doxelApp')
  .directive('dnd', function () {
    return {
      restrict: 'A',
      replace: false,
      scope: true,
      link: function postLink(scope, $element, attrs) {
        scope.onDragStart=(attrs.onDragStart)?$parse(attrs.onDragStart):function(scope,e){console.log(e.$event)};
        scope.onDragEnter=(attrs.onDragEnter)?$parse(attrs.onDragEnter):function(scope,e){console.log(e.$event)};
        scope.onDragOver=(attrs.onDragOver)?$parse(attrs.onDragOver):function(scope,e){console.log(e.$event)};
        scope.onDragLeave=(attrs.onDragLeave)?$parse(attrs.onDragLeave):function(scope,e){console.log(e.$event)};
        scope.onDrop=(attrs.onDrop)?$parse(attrs.onDrop):function(scope,e){console.log(e.$event)};
        scope.onDragEnd=(attrs.onDragEnd)?$parse(attrs.onDragEnd):function(scope,e){console.log(e.$event)};

        scope.dragOverClass=scope.dndDragoverClass||'dragover';
        scope.selector=scope.dndSelector||$element[0].tagName;

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
          disablePointerEvents(false);
        }

        function getDraggableElem(elem) {
          return $(elem).closest(scope.selector);
        }

        function disablePointerEvents(disable){
          $(scope.selector+ ' div').css('pointer-events',((disable)?'none':''));
        }

        // dragndrop event handlers

        function ondragstart(e) {
          cleanup();
          if (scope.onDragStart(scope,{$event: e})===false) {
            return;
          }
          getDraggableElem(e.target).addClass('dragging');
          disablePointerEvents(true);
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
