/*
 * jpeg-file.js
 *
 * Copyright (c) 2017 ALSENET SA - http://doxel.org
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
 * @name doxelApp.jpegFile
 * @description
 * # jpegFile
 * Service in the doxelApp.
 */
angular.module('doxelApp')
.service('jpegFile', ['$q', function ($q) {
  // AngularJS will instantiate a singleton by calling "new" on this function
  var self=this;

  angular.extend(this,{
    reader: new FileReader(),
    canvas: document.createElement('canvas'),
    /**
     * @method jpegFile.getFileDataUrl
     * @description read data.file as data.fileDataURL and resolve
     * @param data (object)
     * @returns promise
     */
    getFileDataURL: function(data) {
      var file=data.file;
      var q=$q.defer();

      self.reader.onload=function(e){
        data.fileDataURL=e.target.result;
        q.resolve(data);
      }
      self.reader.onerror=q.reject;
      self.reader.onabort=q.reject;
      self.reader.onprogress=q.notify;
      self.reader.readAsDataURL(file);
      return q.promise;
    }, // getFileDataURL

    /**
     * @method jpegFile.preloadImage
     * @description preload data.fileDataURL in data.img and resolve
     * @param data (object)
     * @returns promise
     */
    preloadImage: function(data) {
      var q=$q.defer();
      data.img=data.img||new Image();
      data.img.onload=function(e){
        q.resolve(data);
      }
      data.img.onerror=data.img.onabort=q.reject;
      data.img.src=data.fileDataURL;
      return q.promise;
    },

    getThumb: function(data) {
      if (!data.img||!data.img.height) {
        return $q.resolve(data);
      }
      try {
        var aspect=data.img.width/data.img.height;
        var length=data.thumbLength||512;
        var width=aspect>=1?length:Math.round(length*aspect);
        var height=aspect<=1?length:Math.round(length/aspect);
        var canvas=self.canvas||(self.canvas=document.createElement('canvas'));
        canvas.width=width;
        canvas.height=height;
        canvas.getContext('2d').drawImage(data.img,0,0,canvas.width,canvas.height)
        data.img=null;
      } catch(e) {
        console.log(e);
        return $q.reject(e);
      }
      return $q.resolve(data);
    },

    /**
     * @method jpegFile.getBinaryString
     * @description Read data.file as data.jpeg (binaryString)
     * @param data (object)
     * @returns promise
     */
    getBinaryString: function(data){
      var file=data.file;
      var q=$q.defer();
      self.reader.onload=function(e) {
        data.jpeg=e.target.result;
        q.resolve(data);
      };
      self.reader.readAsBinaryString(file);
      return q.promise;
    }, // getBinaryString
    /**
     * @method jpegFile.getEXIF
     * @description load exif with piexif as data.res
     * @param data (object)
     * @returns promise
     */
    getEXIF: function(data){
      try {
        var res=piexif.load(data.jpeg);
        angular.extend(data,{
          res: res,
          exif: res.exif_dict,
          exifReader: res.exifReader,
          b64: res.b64
        });
        return $q.resolve(data);

      } catch(e) {
        return $q.reject(e);
      }
    }, // getExif

    /**
     * @method jpegFile.updateEXIF
     * @description Insert or replace copyright from loaded exif
     * @param data (object)
     * @returns promise
     */
    updateEXIF: function (data) {
        var exif=data.exif;
        var exifReader=data.exifReader;
        var b64=data.b64;

        if (exif) {
          // TODO: date should come from the server
          exif['0th'][piexif.ImageIFD.Copyright]="Copyright (c) "+(new Date()).getFullYear()+" by DOXEL.org at Alsenet SA. CCBY-SA.";

          var bytes;
          try {
            // get modified exif bytes
            bytes=piexif.dump(exif);

            // add or replace app1 exif segment
            if (exifReader.app1_segmentIndex===undefined) {
              data.jpeg_new=piexif.insert(bytes,exifReader);

            } else {
              data.jpeg_new=piexif.replace(bytes,exifReader,b64);
            }

          } catch(err) {
            console.log('Could not update exif for '+data.file.name);
            console.log(err);
            // continue anyway
          }

          return $q.when(data);

        } else {
          if (!exif) {
            console.log('no exif !');
          }
        }

        return $q.when(data);

    }, // updateExif

    /**
     * @method jpegFile.getHash
     * @description get sha256 from piexif's data.exifReader (excluding exif data)
     * @param data (object)
     * @returns promise
     */
    getHash: function (data) {
        var exifReader=data.exifReader;

        if (exifReader) {
          // skip exif data
          data.sha256=asmCrypto.SHA256.hex(exifReader.getJpegData());
          return $q.when(data);

        } else {
          // no exif data
          data.sha256=asmCrypto.SHA256.hex(data.jpeg);
          return $q.when(data);
        }

    }, // getHash

    /**
     * @method jpegFile.getTimestamp
     * @description set data.timestamp from data.exif
     * @param data (object)
     * @returns promise
     */
    getTimestamp: function(data){
      var dateTimeOriginal=data.exif['Exif'][piexif.ExifIFD.DateTimeOriginal];
      var subSecTimeOriginal=data.exif['Exif'][piexif.ExifIFD.SubSecTimeOriginal];
      
      if (dateTimeOriginal) {
      
        // try to convert date to numerical timestamp
        try {
          var _timestamp=new Date(dateTimeOriginal.replace(/([0-9]{4}):([0-9]{2}):([0-9]{2})/,"$1/$2/$3")).getTime();
      
          if (isNaN(_timestamp)) {
             _timestamp=new Date(dateTimeOriginal.replace(/([0-9]{4}):([0-9]{2}):([0-9]{2})/,"$1-$2-$3")).getTime();
          }
      
          if (isNaN(_timestamp)) {
            throw new Error('Could not convert EXIF timestamp');
      
          } else {
      
            if (subSecTimeOriginal) {
              data.timestamp=String(_timestamp).substr(0,10)+'_'+String(subSecTimeOriginal).trim().substr(0,6);
              while(data.timestamp.length<17) data.timestamp+='0';
      
            } else {
              data.timestamp=String(_timestamp).replace(/([0-9]{10})/,'$1_')+'000';
            }
          }
      
        } catch(e) {
          console.log(dateTimeOriginal,subSecTimeOriginal,e);
          return $q.reject(e);
        }
      }
      
      return $q.when(data);

    }, // getTimestamp,

    /**
     * @method jpegFile.getGPSCoords
     * @description get gps coordinates from loaded exif data
     * @param data (object)
     * @returns promise
     */
    getGPSCoords: function(data){
      // get GPS coordinates
      try {
        var rawdms=data.exif['GPS'][piexif.GPSIFD.GPSLongitude];
        if (rawdms) {
          var dms=[
            parseInt(rawdms[0][0])/parseInt(rawdms[0][1]),
            parseInt(rawdms[1][0])/parseInt(rawdms[1][1]),
            parseInt(rawdms[2][0])/parseInt(rawdms[2][1])
          ];

          // convert to decimal
          data.lon=dms[0]+dms[1]/60+dms[2]/3600;
      
          // set negative value for west coordinate
          if (data.exif['GPS'][piexif.GPSIFD.GPSLongitudeRef]=='W') {
            data.lon=-Math.abs(data.lon);
          }
      
        }
      } catch(e) {
        console.log(e);
        return $q.reject(e);
      }
      
      try {
        var rawdms=data.exif['GPS'][piexif.GPSIFD.GPSLatitude];
      
        if (rawdms) {
          var dms=[
            parseInt(rawdms[0][0])/parseInt(rawdms[0][1]),
            parseInt(rawdms[1][0])/parseInt(rawdms[1][1]),
            parseInt(rawdms[2][0])/parseInt(rawdms[2][1])
          ];

          // convert to signed decimal
          data.lat=dms[0]+dms[1]/60+dms[2]/3600;
      
          // set negative value for south coordinate
          if (data.exif['GPS'][piexif.GPSIFD.GPSLongitudeRef]=='S') {
            data.lat=-Math.abs(data.lat);
          }
      
        }
      
      } catch(e) {
        console.log(e);
        return $q.reject(e);
      }

      return $q.when(data);

    } // getGPSCoords


  });
}]);
