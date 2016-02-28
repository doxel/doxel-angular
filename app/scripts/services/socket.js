/*
 * socket.js
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
 * @name doxelApp.socketService
 * @description
 * # socketService
 * Service in the doxelApp.
 */
angular.module('doxelApp')
  .service('socketService', function ($rootScope,$cookies,errorMessage,socketFactory,LoopBackAuth) {
    var self=this;

    this.init=function socketService_init(){
      $rootScope.$watch('currentUserId',function(newValue){
        if (newValue) {
          self.connect();
        } else {
          if (self.ioSocket) {
            self.ioSocket.close();
            self.ioSocket=null;
          }
        }
      });

      self.configured=true;
    }

    this.connect=function socketService_connect(){
      //Creating connection with server
      var socket = self.ioSocket = io.connect('https://localhost:3000');
      console.log(socket);

      //This part is only for login users for authenticated socket connection between client and server.
      //If you are not using login page in you website then you should remove rest piece of code..
      var id = LoopBackAuth.accessTokenId;
      var userId = LoopBackAuth.currentUserId;
      socket.on('connect', function(){
          self.connected=true;
          socket.emit('authentication', {id: id, userId: userId });
          socket.on('authenticated', function() {
              console.log('User is authenticated');
              $cookies.put('socket',socket.id,{path:'/'});
          });
          socket.on('disconnect',function(){
            console.log('disconnect');
            $cookies.remove('socket',{path:'/'});
            self.connected=false;
          });
      });

      self.socket=socketFactory({
        ioSocket: socket
      });

    }

    if (!this.configured) {
//      this.init();
    }

    if (!this.connected) {
      this.connect();
    }
    return this;

  });
