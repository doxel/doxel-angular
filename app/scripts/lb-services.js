// CommonJS package manager support
if (typeof module !== 'undefined' && typeof exports !== 'undefined' &&
  module.exports === exports) {
  // Export the *name* of this Angular module
  // Sample usage:
  //
  //   import lbServices from './lb-services';
  //   angular.module('app', [lbServices]);
  //
  module.exports = "lbServices";
}

(function(window, angular, undefined) {
  'use strict';

  var urlBase = "/api";
  var authHeader = 'authorization';

  function getHost(url) {
    var m = url.match(/^(?:https?:)?\/\/([^\/]+)/);
    return m ? m[1] : null;
  }

  var urlBaseHost = getHost(urlBase) || location.host;

/**
 * @ngdoc overview
 * @name lbServices
 * @module
 * @description
 *
 * The `lbServices` module provides services for interacting with
 * the models exposed by the LoopBack server via the REST API.
 *
 */
  var module = angular.module("lbServices", ['ngResource']);

/**
 * @ngdoc object
 * @name lbServices.User
 * @header lbServices.User
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `User` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
  module.factory(
    "User",
    [
      'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
      function(LoopBackResource, LoopBackAuth, $injector, $q) {
        var R = LoopBackResource(
        urlBase + "/users/:id",
          { 'id': '@id' },
          {

            /**
             * @ngdoc method
             * @name lbServices.User#prototype$__findById__accessTokens
             * @methodOf lbServices.User
             *
             * @description
             *
             * Find a related item by id for accessTokens.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - user id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for accessTokens
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "prototype$__findById__accessTokens": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/users/:id/accessTokens/:fk",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#prototype$__destroyById__accessTokens
             * @methodOf lbServices.User
             *
             * @description
             *
             * Delete a related item by id for accessTokens.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - user id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for accessTokens
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "prototype$__destroyById__accessTokens": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/users/:id/accessTokens/:fk",
              method: "DELETE",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#prototype$__updateById__accessTokens
             * @methodOf lbServices.User
             *
             * @description
             *
             * Update a related item by id for accessTokens.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - user id
             *
             *  - `fk` – `{*}` - Foreign key for accessTokens
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "prototype$__updateById__accessTokens": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/users/:id/accessTokens/:fk",
              method: "PUT",
            },

            // INTERNAL. Use User.credentials.findById() instead.
            "prototype$__findById__credentials": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/users/:id/credentials/:fk",
              method: "GET",
            },

            // INTERNAL. Use User.credentials.destroyById() instead.
            "prototype$__destroyById__credentials": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/users/:id/credentials/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use User.credentials.updateById() instead.
            "prototype$__updateById__credentials": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/users/:id/credentials/:fk",
              method: "PUT",
            },

            // INTERNAL. Use User.identities.findById() instead.
            "prototype$__findById__identities": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/users/:id/identities/:fk",
              method: "GET",
            },

            // INTERNAL. Use User.identities.destroyById() instead.
            "prototype$__destroyById__identities": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/users/:id/identities/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use User.identities.updateById() instead.
            "prototype$__updateById__identities": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/users/:id/identities/:fk",
              method: "PUT",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#prototype$__findById__roles
             * @methodOf lbServices.User
             *
             * @description
             *
             * Find a related item by id for roles.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - user id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for roles
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "prototype$__findById__roles": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/users/:id/roles/:fk",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#prototype$__destroyById__roles
             * @methodOf lbServices.User
             *
             * @description
             *
             * Delete a related item by id for roles.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - user id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for roles
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "prototype$__destroyById__roles": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/users/:id/roles/:fk",
              method: "DELETE",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#prototype$__updateById__roles
             * @methodOf lbServices.User
             *
             * @description
             *
             * Update a related item by id for roles.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - user id
             *
             *  - `fk` – `{*}` - Foreign key for roles
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "prototype$__updateById__roles": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/users/:id/roles/:fk",
              method: "PUT",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#prototype$__link__roles
             * @methodOf lbServices.User
             *
             * @description
             *
             * Add a related item by id for roles.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - user id
             *
             *  - `fk` – `{*}` - Foreign key for roles
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "prototype$__link__roles": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/users/:id/roles/rel/:fk",
              method: "PUT",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#prototype$__unlink__roles
             * @methodOf lbServices.User
             *
             * @description
             *
             * Remove the roles relation to an item by id.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - user id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for roles
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "prototype$__unlink__roles": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/users/:id/roles/rel/:fk",
              method: "DELETE",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#prototype$__exists__roles
             * @methodOf lbServices.User
             *
             * @description
             *
             * Check the existence of roles relation to an item by id.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - user id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for roles
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "prototype$__exists__roles": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/users/:id/roles/rel/:fk",
              method: "HEAD",
            },

            // INTERNAL. Use User.segments.findById() instead.
            "prototype$__findById__segments": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/users/:id/segments/:fk",
              method: "GET",
            },

            // INTERNAL. Use User.segments.destroyById() instead.
            "prototype$__destroyById__segments": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/users/:id/segments/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use User.segments.updateById() instead.
            "prototype$__updateById__segments": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/users/:id/segments/:fk",
              method: "PUT",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#prototype$__get__accessTokens
             * @methodOf lbServices.User
             *
             * @description
             *
             * Queries accessTokens of user.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - user id
             *
             *  - `options` – `{object=}` -
             *
             *  - `filter` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "prototype$__get__accessTokens": {
              isArray: true,
              url: urlBase + "/users/:id/accessTokens",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#prototype$__create__accessTokens
             * @methodOf lbServices.User
             *
             * @description
             *
             * Creates a new instance in accessTokens of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - user id
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "prototype$__create__accessTokens": {
              url: urlBase + "/users/:id/accessTokens",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#prototype$__delete__accessTokens
             * @methodOf lbServices.User
             *
             * @description
             *
             * Deletes all accessTokens of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - user id
             *
             *  - `options` – `{object=}` -
             *
             *  - `where` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "prototype$__delete__accessTokens": {
              url: urlBase + "/users/:id/accessTokens",
              method: "DELETE",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#prototype$__count__accessTokens
             * @methodOf lbServices.User
             *
             * @description
             *
             * Counts accessTokens of user.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - user id
             *
             *  - `options` – `{object=}` -
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
            "prototype$__count__accessTokens": {
              url: urlBase + "/users/:id/accessTokens/count",
              method: "GET",
            },

            // INTERNAL. Use User.credentials() instead.
            "prototype$__get__credentials": {
              isArray: true,
              url: urlBase + "/users/:id/credentials",
              method: "GET",
            },

            // INTERNAL. Use User.credentials.create() instead.
            "prototype$__create__credentials": {
              url: urlBase + "/users/:id/credentials",
              method: "POST",
            },

            // INTERNAL. Use User.credentials.destroyAll() instead.
            "prototype$__delete__credentials": {
              url: urlBase + "/users/:id/credentials",
              method: "DELETE",
            },

            // INTERNAL. Use User.credentials.count() instead.
            "prototype$__count__credentials": {
              url: urlBase + "/users/:id/credentials/count",
              method: "GET",
            },

            // INTERNAL. Use User.identities() instead.
            "prototype$__get__identities": {
              isArray: true,
              url: urlBase + "/users/:id/identities",
              method: "GET",
            },

            // INTERNAL. Use User.identities.create() instead.
            "prototype$__create__identities": {
              url: urlBase + "/users/:id/identities",
              method: "POST",
            },

            // INTERNAL. Use User.identities.destroyAll() instead.
            "prototype$__delete__identities": {
              url: urlBase + "/users/:id/identities",
              method: "DELETE",
            },

            // INTERNAL. Use User.identities.count() instead.
            "prototype$__count__identities": {
              url: urlBase + "/users/:id/identities/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#prototype$__get__roles
             * @methodOf lbServices.User
             *
             * @description
             *
             * Queries roles of user.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - user id
             *
             *  - `options` – `{object=}` -
             *
             *  - `filter` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "prototype$__get__roles": {
              isArray: true,
              url: urlBase + "/users/:id/roles",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#prototype$__create__roles
             * @methodOf lbServices.User
             *
             * @description
             *
             * Creates a new instance in roles of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - user id
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "prototype$__create__roles": {
              url: urlBase + "/users/:id/roles",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#prototype$__delete__roles
             * @methodOf lbServices.User
             *
             * @description
             *
             * Deletes all roles of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - user id
             *
             *  - `options` – `{object=}` -
             *
             *  - `where` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "prototype$__delete__roles": {
              url: urlBase + "/users/:id/roles",
              method: "DELETE",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#prototype$__count__roles
             * @methodOf lbServices.User
             *
             * @description
             *
             * Counts roles of user.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - user id
             *
             *  - `options` – `{object=}` -
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
            "prototype$__count__roles": {
              url: urlBase + "/users/:id/roles/count",
              method: "GET",
            },

            // INTERNAL. Use User.segments() instead.
            "prototype$__get__segments": {
              isArray: true,
              url: urlBase + "/users/:id/segments",
              method: "GET",
            },

            // INTERNAL. Use User.segments.create() instead.
            "prototype$__create__segments": {
              url: urlBase + "/users/:id/segments",
              method: "POST",
            },

            // INTERNAL. Use User.segments.destroyAll() instead.
            "prototype$__delete__segments": {
              url: urlBase + "/users/:id/segments",
              method: "DELETE",
            },

            // INTERNAL. Use User.segments.count() instead.
            "prototype$__count__segments": {
              url: urlBase + "/users/:id/segments/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#create
             * @methodOf lbServices.User
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "create": {
              url: urlBase + "/users",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#createMany
             * @methodOf lbServices.User
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "createMany": {
              isArray: true,
              url: urlBase + "/users",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#patchOrCreate
             * @methodOf lbServices.User
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "patchOrCreate": {
              url: urlBase + "/users",
              method: "PATCH",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#replaceOrCreate
             * @methodOf lbServices.User
             *
             * @description
             *
             * Replace an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "replaceOrCreate": {
              url: urlBase + "/users/replaceOrCreate",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#upsertWithWhere
             * @methodOf lbServices.User
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source based on the where criteria.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "upsertWithWhere": {
              url: urlBase + "/users/upsertWithWhere",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#exists
             * @methodOf lbServices.User
             *
             * @description
             *
             * Check whether a model instance exists in the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `exists` – `{boolean=}` -
             */
            "exists": {
              url: urlBase + "/users/:id/exists",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#findById
             * @methodOf lbServices.User
             *
             * @description
             *
             * Find a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `filter` – `{object=}` - Filter defining fields and include - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "findById": {
              url: urlBase + "/users/:id",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#replaceById
             * @methodOf lbServices.User
             *
             * @description
             *
             * Replace attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "replaceById": {
              url: urlBase + "/users/:id/replace",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#find
             * @methodOf lbServices.User
             *
             * @description
             *
             * Find all instances of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "find": {
              isArray: true,
              url: urlBase + "/users",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#findOne
             * @methodOf lbServices.User
             *
             * @description
             *
             * Find first instance of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "findOne": {
              url: urlBase + "/users/findOne",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#updateAll
             * @methodOf lbServices.User
             *
             * @description
             *
             * Update instances of the model matched by {{where}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Information related to the outcome of the operation
             */
            "updateAll": {
              url: urlBase + "/users/update",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#deleteById
             * @methodOf lbServices.User
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "deleteById": {
              url: urlBase + "/users/:id",
              method: "DELETE",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#count
             * @methodOf lbServices.User
             *
             * @description
             *
             * Count instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
            "count": {
              url: urlBase + "/users/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#prototype$patchAttributes
             * @methodOf lbServices.User
             *
             * @description
             *
             * Patch attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - user id
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "prototype$patchAttributes": {
              url: urlBase + "/users/:id",
              method: "PATCH",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#createChangeStream
             * @methodOf lbServices.User
             *
             * @description
             *
             * Create a change stream.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `changes` – `{ReadableStream=}` -
             */
            "createChangeStream": {
              url: urlBase + "/users/change-stream",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#login
             * @methodOf lbServices.User
             *
             * @description
             *
             * Login a user with username/email and password.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `include` – `{string=}` - Related objects to include in the response. See the description of return value for more details.
             *   Default value: `user`.
             *
             *  - `rememberMe` - `boolean` - Whether the authentication credentials
             *     should be remembered in localStorage across app/browser restarts.
             *     Default: `true`.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * The response body contains properties of the AccessToken created on login.
             * Depending on the value of `include` parameter, the body may contain additional properties:
             *   - `user` - `U+007BUserU+007D` - Data of the currently logged in user. (`include=user`)
             *
             */
            "login": {
              params: {
                include: 'user',
              },
              interceptor: {
                response: function(response) {
                  var accessToken = response.data;
                  LoopBackAuth.setUser(
                    accessToken.id, accessToken.userId, accessToken.user);
                  LoopBackAuth.rememberMe =
                    response.config.params.rememberMe !== false;
                  LoopBackAuth.save();
                  return response.resource;
                },
              },
              url: urlBase + "/users/login",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#logout
             * @methodOf lbServices.User
             *
             * @description
             *
             * Logout a user with access token.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `access_token` – `{string=}` - Do not supply this argument, it is automatically extracted from request headers.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "logout": {
              interceptor: {
                response: function(response) {
                  LoopBackAuth.clearUser();
                  LoopBackAuth.clearStorage();
                  return response.resource;
                },
                responseError: function(responseError) {
                  LoopBackAuth.clearUser();
                  LoopBackAuth.clearStorage();
                  return responseError.resource;
                },
              },
              url: urlBase + "/users/logout",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#prototype$verify
             * @methodOf lbServices.User
             *
             * @description
             *
             * Trigger user's identity verification with configured verifyOptions
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - user id
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `verifyOptions` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "prototype$verify": {
              url: urlBase + "/users/:id/verify",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#confirm
             * @methodOf lbServices.User
             *
             * @description
             *
             * Confirm a user registration with identity verification token.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `uid` – `{string}` -
             *
             *  - `token` – `{string}` -
             *
             *  - `redirect` – `{string=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "confirm": {
              url: urlBase + "/users/confirm",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#resetPassword
             * @methodOf lbServices.User
             *
             * @description
             *
             * Reset password for a user with email.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "resetPassword": {
              url: urlBase + "/users/reset",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#changePassword
             * @methodOf lbServices.User
             *
             * @description
             *
             * Change a user's password.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `id` – `{*=}` -
             *
             *  - `oldPassword` – `{string}` -
             *
             *  - `newPassword` – `{string}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "changePassword": {
              url: urlBase + "/users/change-password",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#setPassword
             * @methodOf lbServices.User
             *
             * @description
             *
             * Reset user's password via a password-reset token.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `id` – `{*=}` -
             *
             *  - `newPassword` – `{string}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "setPassword": {
              url: urlBase + "/users/reset-password",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#signup
             * @methodOf lbServices.User
             *
             * @description
             *
             * <em>
             * (The remote method definition does not provide any description.)
             * </em>
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `req` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `result` – `{object=}` -
             */
            "signup": {
              url: urlBase + "/users/signup",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#signin
             * @methodOf lbServices.User
             *
             * @description
             *
             * <em>
             * (The remote method definition does not provide any description.)
             * </em>
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `req` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `result` – `{object=}` -
             */
            "signin": {
              url: urlBase + "/users/signin",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#signout
             * @methodOf lbServices.User
             *
             * @description
             *
             * <em>
             * (The remote method definition does not provide any description.)
             * </em>
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `req` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `result` – `{object=}` -
             */
            "signout": {
              url: urlBase + "/users/signout",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#changePassword
             * @methodOf lbServices.User
             *
             * @description
             *
             * <em>
             * (The remote method definition does not provide any description.)
             * </em>
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `req` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `result` – `{object=}` -
             */
            "changePassword": {
              url: urlBase + "/users/changePassword",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#grantRole
             * @methodOf lbServices.User
             *
             * @description
             *
             * <em>
             * (The remote method definition does not provide any description.)
             * </em>
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `result` – `{object=}` -
             */
            "grantRole": {
              url: urlBase + "/users/grantRole",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#revokeRole
             * @methodOf lbServices.User
             *
             * @description
             *
             * <em>
             * (The remote method definition does not provide any description.)
             * </em>
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `result` – `{object=}` -
             */
            "revokeRole": {
              url: urlBase + "/users/revokeRole",
              method: "POST",
            },

            // INTERNAL. Use UserCredential.user() instead.
            "::get::UserCredential::user": {
              url: urlBase + "/userCredentials/:id/user",
              method: "GET",
            },

            // INTERNAL. Use UserIdentity.user() instead.
            "::get::UserIdentity::user": {
              url: urlBase + "/userIdentities/:id/user",
              method: "GET",
            },

            // INTERNAL. Use InstanceAcl.user() instead.
            "::get::InstanceAcl::user": {
              url: urlBase + "/InstanceAcls/:id/user",
              method: "GET",
            },

            // INTERNAL. Use POI.user() instead.
            "::get::POI::user": {
              url: urlBase + "/POIs/:id/user",
              method: "GET",
            },

            // INTERNAL. Use Comment.user() instead.
            "::get::Comment::user": {
              url: urlBase + "/Comments/:id/user",
              method: "GET",
            },

            // INTERNAL. Use Job.user() instead.
            "::get::Job::user": {
              url: urlBase + "/jobs/:id/user",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#getCurrent
             * @methodOf lbServices.User
             *
             * @description
             *
             * Get data of the currently logged user. Fail with HTTP result 401
             * when there is no user logged in.
             *
             * @param {function(Object,Object)=} successCb
             *    Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *    `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             */
            'getCurrent': {
              url: urlBase + "/users" + '/:id',
              method: 'GET',
              params: {
                id: function() {
                  var id = LoopBackAuth.currentUserId;
                  if (id == null) id = '__anonymous__';
                  return id;
                },
              },
              interceptor: {
                response: function(response) {
                  LoopBackAuth.currentUserData = response.data;
                  return response.resource;
                },
                responseError: function(responseError) {
                  LoopBackAuth.clearUser();
                  LoopBackAuth.clearStorage();
                  return $q.reject(responseError);
                },
              },
              __isGetCurrentUser__: true,
            },
          }
        );



            /**
             * @ngdoc method
             * @name lbServices.User#upsert
             * @methodOf lbServices.User
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
        R["upsert"] = R["patchOrCreate"];

            /**
             * @ngdoc method
             * @name lbServices.User#updateOrCreate
             * @methodOf lbServices.User
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
        R["updateOrCreate"] = R["patchOrCreate"];

            /**
             * @ngdoc method
             * @name lbServices.User#patchOrCreateWithWhere
             * @methodOf lbServices.User
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source based on the where criteria.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
        R["patchOrCreateWithWhere"] = R["upsertWithWhere"];

            /**
             * @ngdoc method
             * @name lbServices.User#update
             * @methodOf lbServices.User
             *
             * @description
             *
             * Update instances of the model matched by {{where}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Information related to the outcome of the operation
             */
        R["update"] = R["updateAll"];

            /**
             * @ngdoc method
             * @name lbServices.User#destroyById
             * @methodOf lbServices.User
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
        R["destroyById"] = R["deleteById"];

            /**
             * @ngdoc method
             * @name lbServices.User#removeById
             * @methodOf lbServices.User
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
        R["removeById"] = R["deleteById"];

            /**
             * @ngdoc method
             * @name lbServices.User#updateAttributes
             * @methodOf lbServices.User
             *
             * @description
             *
             * Patch attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - user id
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
        R["updateAttributes"] = R["prototype$patchAttributes"];

        /**
         * @ngdoc method
         * @name lbServices.User#getCachedCurrent
         * @methodOf lbServices.User
         *
         * @description
         *
         * Get data of the currently logged user that was returned by the last
         * call to {@link lbServices.User#login} or
         * {@link lbServices.User#getCurrent}. Return null when there
         * is no user logged in or the data of the current user were not fetched
         * yet.
         *
         * @returns {Object} A User instance.
         */
        R.getCachedCurrent = function() {
          var data = LoopBackAuth.currentUserData;
          return data ? new R(data) : null;
        };

        /**
         * @ngdoc method
         * @name lbServices.User#isAuthenticated
         * @methodOf lbServices.User
         *
         * @returns {boolean} True if the current user is authenticated (logged in).
         */
        R.isAuthenticated = function() {
          return this.getCurrentId() != null;
        };

        /**
         * @ngdoc method
         * @name lbServices.User#getCurrentId
         * @methodOf lbServices.User
         *
         * @returns {Object} Id of the currently logged-in user or null.
         */
        R.getCurrentId = function() {
          return LoopBackAuth.currentUserId;
        };

        /**
        * @ngdoc property
        * @name lbServices.User#modelName
        * @propertyOf lbServices.User
        * @description
        * The name of the model represented by this $resource,
        * i.e. `User`.
        */
        R.modelName = "User";

    /**
     * @ngdoc object
     * @name lbServices.User.credentials
     * @header lbServices.User.credentials
     * @object
     * @description
     *
     * The object `User.credentials` groups methods
     * manipulating `UserCredential` instances related to `User`.
     *
     * Call {@link lbServices.User#credentials User.credentials()}
     * to query all related instances.
     */


            /**
             * @ngdoc method
             * @name lbServices.User#credentials
             * @methodOf lbServices.User
             *
             * @description
             *
             * Queries credentials of user.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - user id
             *
             *  - `options` – `{object=}` -
             *
             *  - `filter` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `UserCredential` object.)
             * </em>
             */
        R.credentials = function() {
          var TargetResource = $injector.get("UserCredential");
          var action = TargetResource["::get::User::credentials"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.User.credentials#count
             * @methodOf lbServices.User.credentials
             *
             * @description
             *
             * Counts credentials of user.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - user id
             *
             *  - `options` – `{object=}` -
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
        R.credentials.count = function() {
          var TargetResource = $injector.get("UserCredential");
          var action = TargetResource["::count::User::credentials"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.User.credentials#create
             * @methodOf lbServices.User.credentials
             *
             * @description
             *
             * Creates a new instance in credentials of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - user id
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `UserCredential` object.)
             * </em>
             */
        R.credentials.create = function() {
          var TargetResource = $injector.get("UserCredential");
          var action = TargetResource["::create::User::credentials"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.User.credentials#createMany
             * @methodOf lbServices.User.credentials
             *
             * @description
             *
             * Creates a new instance in credentials of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - user id
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `UserCredential` object.)
             * </em>
             */
        R.credentials.createMany = function() {
          var TargetResource = $injector.get("UserCredential");
          var action = TargetResource["::createMany::User::credentials"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.User.credentials#destroyAll
             * @methodOf lbServices.User.credentials
             *
             * @description
             *
             * Deletes all credentials of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - user id
             *
             *  - `options` – `{object=}` -
             *
             *  - `where` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.credentials.destroyAll = function() {
          var TargetResource = $injector.get("UserCredential");
          var action = TargetResource["::delete::User::credentials"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.User.credentials#destroyById
             * @methodOf lbServices.User.credentials
             *
             * @description
             *
             * Delete a related item by id for credentials.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - user id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for credentials
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.credentials.destroyById = function() {
          var TargetResource = $injector.get("UserCredential");
          var action = TargetResource["::destroyById::User::credentials"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.User.credentials#findById
             * @methodOf lbServices.User.credentials
             *
             * @description
             *
             * Find a related item by id for credentials.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - user id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for credentials
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `UserCredential` object.)
             * </em>
             */
        R.credentials.findById = function() {
          var TargetResource = $injector.get("UserCredential");
          var action = TargetResource["::findById::User::credentials"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.User.credentials#updateById
             * @methodOf lbServices.User.credentials
             *
             * @description
             *
             * Update a related item by id for credentials.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - user id
             *
             *  - `fk` – `{*}` - Foreign key for credentials
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `UserCredential` object.)
             * </em>
             */
        R.credentials.updateById = function() {
          var TargetResource = $injector.get("UserCredential");
          var action = TargetResource["::updateById::User::credentials"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.User.identities
     * @header lbServices.User.identities
     * @object
     * @description
     *
     * The object `User.identities` groups methods
     * manipulating `UserIdentity` instances related to `User`.
     *
     * Call {@link lbServices.User#identities User.identities()}
     * to query all related instances.
     */


            /**
             * @ngdoc method
             * @name lbServices.User#identities
             * @methodOf lbServices.User
             *
             * @description
             *
             * Queries identities of user.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - user id
             *
             *  - `options` – `{object=}` -
             *
             *  - `filter` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `UserIdentity` object.)
             * </em>
             */
        R.identities = function() {
          var TargetResource = $injector.get("UserIdentity");
          var action = TargetResource["::get::User::identities"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.User.identities#count
             * @methodOf lbServices.User.identities
             *
             * @description
             *
             * Counts identities of user.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - user id
             *
             *  - `options` – `{object=}` -
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
        R.identities.count = function() {
          var TargetResource = $injector.get("UserIdentity");
          var action = TargetResource["::count::User::identities"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.User.identities#create
             * @methodOf lbServices.User.identities
             *
             * @description
             *
             * Creates a new instance in identities of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - user id
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `UserIdentity` object.)
             * </em>
             */
        R.identities.create = function() {
          var TargetResource = $injector.get("UserIdentity");
          var action = TargetResource["::create::User::identities"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.User.identities#createMany
             * @methodOf lbServices.User.identities
             *
             * @description
             *
             * Creates a new instance in identities of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - user id
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `UserIdentity` object.)
             * </em>
             */
        R.identities.createMany = function() {
          var TargetResource = $injector.get("UserIdentity");
          var action = TargetResource["::createMany::User::identities"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.User.identities#destroyAll
             * @methodOf lbServices.User.identities
             *
             * @description
             *
             * Deletes all identities of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - user id
             *
             *  - `options` – `{object=}` -
             *
             *  - `where` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.identities.destroyAll = function() {
          var TargetResource = $injector.get("UserIdentity");
          var action = TargetResource["::delete::User::identities"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.User.identities#destroyById
             * @methodOf lbServices.User.identities
             *
             * @description
             *
             * Delete a related item by id for identities.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - user id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for identities
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.identities.destroyById = function() {
          var TargetResource = $injector.get("UserIdentity");
          var action = TargetResource["::destroyById::User::identities"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.User.identities#findById
             * @methodOf lbServices.User.identities
             *
             * @description
             *
             * Find a related item by id for identities.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - user id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for identities
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `UserIdentity` object.)
             * </em>
             */
        R.identities.findById = function() {
          var TargetResource = $injector.get("UserIdentity");
          var action = TargetResource["::findById::User::identities"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.User.identities#updateById
             * @methodOf lbServices.User.identities
             *
             * @description
             *
             * Update a related item by id for identities.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - user id
             *
             *  - `fk` – `{*}` - Foreign key for identities
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `UserIdentity` object.)
             * </em>
             */
        R.identities.updateById = function() {
          var TargetResource = $injector.get("UserIdentity");
          var action = TargetResource["::updateById::User::identities"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.User.segments
     * @header lbServices.User.segments
     * @object
     * @description
     *
     * The object `User.segments` groups methods
     * manipulating `Segment` instances related to `User`.
     *
     * Call {@link lbServices.User#segments User.segments()}
     * to query all related instances.
     */


            /**
             * @ngdoc method
             * @name lbServices.User#segments
             * @methodOf lbServices.User
             *
             * @description
             *
             * Queries segments of user.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - user id
             *
             *  - `options` – `{object=}` -
             *
             *  - `filter` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Segment` object.)
             * </em>
             */
        R.segments = function() {
          var TargetResource = $injector.get("Segment");
          var action = TargetResource["::get::User::segments"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.User.segments#count
             * @methodOf lbServices.User.segments
             *
             * @description
             *
             * Counts segments of user.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - user id
             *
             *  - `options` – `{object=}` -
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
        R.segments.count = function() {
          var TargetResource = $injector.get("Segment");
          var action = TargetResource["::count::User::segments"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.User.segments#create
             * @methodOf lbServices.User.segments
             *
             * @description
             *
             * Creates a new instance in segments of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - user id
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Segment` object.)
             * </em>
             */
        R.segments.create = function() {
          var TargetResource = $injector.get("Segment");
          var action = TargetResource["::create::User::segments"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.User.segments#createMany
             * @methodOf lbServices.User.segments
             *
             * @description
             *
             * Creates a new instance in segments of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - user id
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Segment` object.)
             * </em>
             */
        R.segments.createMany = function() {
          var TargetResource = $injector.get("Segment");
          var action = TargetResource["::createMany::User::segments"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.User.segments#destroyAll
             * @methodOf lbServices.User.segments
             *
             * @description
             *
             * Deletes all segments of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - user id
             *
             *  - `options` – `{object=}` -
             *
             *  - `where` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.segments.destroyAll = function() {
          var TargetResource = $injector.get("Segment");
          var action = TargetResource["::delete::User::segments"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.User.segments#destroyById
             * @methodOf lbServices.User.segments
             *
             * @description
             *
             * Delete a related item by id for segments.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - user id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for segments
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.segments.destroyById = function() {
          var TargetResource = $injector.get("Segment");
          var action = TargetResource["::destroyById::User::segments"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.User.segments#findById
             * @methodOf lbServices.User.segments
             *
             * @description
             *
             * Find a related item by id for segments.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - user id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for segments
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Segment` object.)
             * </em>
             */
        R.segments.findById = function() {
          var TargetResource = $injector.get("Segment");
          var action = TargetResource["::findById::User::segments"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.User.segments#updateById
             * @methodOf lbServices.User.segments
             *
             * @description
             *
             * Update a related item by id for segments.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - user id
             *
             *  - `fk` – `{*}` - Foreign key for segments
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Segment` object.)
             * </em>
             */
        R.segments.updateById = function() {
          var TargetResource = $injector.get("Segment");
          var action = TargetResource["::updateById::User::segments"];
          return action.apply(R, arguments);
        };


        return R;
      }]);

/**
 * @ngdoc object
 * @name lbServices.UserCredential
 * @header lbServices.UserCredential
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `UserCredential` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
  module.factory(
    "UserCredential",
    [
      'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
      function(LoopBackResource, LoopBackAuth, $injector, $q) {
        var R = LoopBackResource(
        urlBase + "/userCredentials/:id",
          { 'id': '@id' },
          {

            // INTERNAL. Use UserCredential.user() instead.
            "prototype$__get__user": {
              url: urlBase + "/userCredentials/:id/user",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.UserCredential#create
             * @methodOf lbServices.UserCredential
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `UserCredential` object.)
             * </em>
             */
            "create": {
              url: urlBase + "/userCredentials",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.UserCredential#createMany
             * @methodOf lbServices.UserCredential
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `UserCredential` object.)
             * </em>
             */
            "createMany": {
              isArray: true,
              url: urlBase + "/userCredentials",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.UserCredential#patchOrCreate
             * @methodOf lbServices.UserCredential
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `UserCredential` object.)
             * </em>
             */
            "patchOrCreate": {
              url: urlBase + "/userCredentials",
              method: "PATCH",
            },

            /**
             * @ngdoc method
             * @name lbServices.UserCredential#replaceOrCreate
             * @methodOf lbServices.UserCredential
             *
             * @description
             *
             * Replace an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `UserCredential` object.)
             * </em>
             */
            "replaceOrCreate": {
              url: urlBase + "/userCredentials/replaceOrCreate",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.UserCredential#upsertWithWhere
             * @methodOf lbServices.UserCredential
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source based on the where criteria.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `UserCredential` object.)
             * </em>
             */
            "upsertWithWhere": {
              url: urlBase + "/userCredentials/upsertWithWhere",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.UserCredential#exists
             * @methodOf lbServices.UserCredential
             *
             * @description
             *
             * Check whether a model instance exists in the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `exists` – `{boolean=}` -
             */
            "exists": {
              url: urlBase + "/userCredentials/:id/exists",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.UserCredential#findById
             * @methodOf lbServices.UserCredential
             *
             * @description
             *
             * Find a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `filter` – `{object=}` - Filter defining fields and include - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `UserCredential` object.)
             * </em>
             */
            "findById": {
              url: urlBase + "/userCredentials/:id",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.UserCredential#replaceById
             * @methodOf lbServices.UserCredential
             *
             * @description
             *
             * Replace attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `UserCredential` object.)
             * </em>
             */
            "replaceById": {
              url: urlBase + "/userCredentials/:id/replace",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.UserCredential#find
             * @methodOf lbServices.UserCredential
             *
             * @description
             *
             * Find all instances of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `UserCredential` object.)
             * </em>
             */
            "find": {
              isArray: true,
              url: urlBase + "/userCredentials",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.UserCredential#findOne
             * @methodOf lbServices.UserCredential
             *
             * @description
             *
             * Find first instance of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `UserCredential` object.)
             * </em>
             */
            "findOne": {
              url: urlBase + "/userCredentials/findOne",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.UserCredential#updateAll
             * @methodOf lbServices.UserCredential
             *
             * @description
             *
             * Update instances of the model matched by {{where}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Information related to the outcome of the operation
             */
            "updateAll": {
              url: urlBase + "/userCredentials/update",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.UserCredential#deleteById
             * @methodOf lbServices.UserCredential
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `UserCredential` object.)
             * </em>
             */
            "deleteById": {
              url: urlBase + "/userCredentials/:id",
              method: "DELETE",
            },

            /**
             * @ngdoc method
             * @name lbServices.UserCredential#count
             * @methodOf lbServices.UserCredential
             *
             * @description
             *
             * Count instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
            "count": {
              url: urlBase + "/userCredentials/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.UserCredential#prototype$patchAttributes
             * @methodOf lbServices.UserCredential
             *
             * @description
             *
             * Patch attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - userCredential id
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `UserCredential` object.)
             * </em>
             */
            "prototype$patchAttributes": {
              url: urlBase + "/userCredentials/:id",
              method: "PATCH",
            },

            /**
             * @ngdoc method
             * @name lbServices.UserCredential#createChangeStream
             * @methodOf lbServices.UserCredential
             *
             * @description
             *
             * Create a change stream.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `changes` – `{ReadableStream=}` -
             */
            "createChangeStream": {
              url: urlBase + "/userCredentials/change-stream",
              method: "POST",
            },

            // INTERNAL. Use User.credentials.findById() instead.
            "::findById::User::credentials": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/users/:id/credentials/:fk",
              method: "GET",
            },

            // INTERNAL. Use User.credentials.destroyById() instead.
            "::destroyById::User::credentials": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/users/:id/credentials/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use User.credentials.updateById() instead.
            "::updateById::User::credentials": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/users/:id/credentials/:fk",
              method: "PUT",
            },

            // INTERNAL. Use User.credentials() instead.
            "::get::User::credentials": {
              isArray: true,
              url: urlBase + "/users/:id/credentials",
              method: "GET",
            },

            // INTERNAL. Use User.credentials.create() instead.
            "::create::User::credentials": {
              url: urlBase + "/users/:id/credentials",
              method: "POST",
            },

            // INTERNAL. Use User.credentials.createMany() instead.
            "::createMany::User::credentials": {
              isArray: true,
              url: urlBase + "/users/:id/credentials",
              method: "POST",
            },

            // INTERNAL. Use User.credentials.destroyAll() instead.
            "::delete::User::credentials": {
              url: urlBase + "/users/:id/credentials",
              method: "DELETE",
            },

            // INTERNAL. Use User.credentials.count() instead.
            "::count::User::credentials": {
              url: urlBase + "/users/:id/credentials/count",
              method: "GET",
            },
          }
        );



            /**
             * @ngdoc method
             * @name lbServices.UserCredential#upsert
             * @methodOf lbServices.UserCredential
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `UserCredential` object.)
             * </em>
             */
        R["upsert"] = R["patchOrCreate"];

            /**
             * @ngdoc method
             * @name lbServices.UserCredential#updateOrCreate
             * @methodOf lbServices.UserCredential
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `UserCredential` object.)
             * </em>
             */
        R["updateOrCreate"] = R["patchOrCreate"];

            /**
             * @ngdoc method
             * @name lbServices.UserCredential#patchOrCreateWithWhere
             * @methodOf lbServices.UserCredential
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source based on the where criteria.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `UserCredential` object.)
             * </em>
             */
        R["patchOrCreateWithWhere"] = R["upsertWithWhere"];

            /**
             * @ngdoc method
             * @name lbServices.UserCredential#update
             * @methodOf lbServices.UserCredential
             *
             * @description
             *
             * Update instances of the model matched by {{where}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Information related to the outcome of the operation
             */
        R["update"] = R["updateAll"];

            /**
             * @ngdoc method
             * @name lbServices.UserCredential#destroyById
             * @methodOf lbServices.UserCredential
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `UserCredential` object.)
             * </em>
             */
        R["destroyById"] = R["deleteById"];

            /**
             * @ngdoc method
             * @name lbServices.UserCredential#removeById
             * @methodOf lbServices.UserCredential
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `UserCredential` object.)
             * </em>
             */
        R["removeById"] = R["deleteById"];

            /**
             * @ngdoc method
             * @name lbServices.UserCredential#updateAttributes
             * @methodOf lbServices.UserCredential
             *
             * @description
             *
             * Patch attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - userCredential id
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `UserCredential` object.)
             * </em>
             */
        R["updateAttributes"] = R["prototype$patchAttributes"];


        /**
        * @ngdoc property
        * @name lbServices.UserCredential#modelName
        * @propertyOf lbServices.UserCredential
        * @description
        * The name of the model represented by this $resource,
        * i.e. `UserCredential`.
        */
        R.modelName = "UserCredential";


            /**
             * @ngdoc method
             * @name lbServices.UserCredential#user
             * @methodOf lbServices.UserCredential
             *
             * @description
             *
             * Fetches belongsTo relation user.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - userCredential id
             *
             *  - `options` – `{object=}` -
             *
             *  - `refresh` – `{boolean=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
        R.user = function() {
          var TargetResource = $injector.get("User");
          var action = TargetResource["::get::UserCredential::user"];
          return action.apply(R, arguments);
        };


        return R;
      }]);

/**
 * @ngdoc object
 * @name lbServices.UserIdentity
 * @header lbServices.UserIdentity
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `UserIdentity` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
  module.factory(
    "UserIdentity",
    [
      'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
      function(LoopBackResource, LoopBackAuth, $injector, $q) {
        var R = LoopBackResource(
        urlBase + "/userIdentities/:id",
          { 'id': '@id' },
          {

            // INTERNAL. Use UserIdentity.user() instead.
            "prototype$__get__user": {
              url: urlBase + "/userIdentities/:id/user",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.UserIdentity#create
             * @methodOf lbServices.UserIdentity
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `UserIdentity` object.)
             * </em>
             */
            "create": {
              url: urlBase + "/userIdentities",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.UserIdentity#createMany
             * @methodOf lbServices.UserIdentity
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `UserIdentity` object.)
             * </em>
             */
            "createMany": {
              isArray: true,
              url: urlBase + "/userIdentities",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.UserIdentity#patchOrCreate
             * @methodOf lbServices.UserIdentity
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `UserIdentity` object.)
             * </em>
             */
            "patchOrCreate": {
              url: urlBase + "/userIdentities",
              method: "PATCH",
            },

            /**
             * @ngdoc method
             * @name lbServices.UserIdentity#replaceOrCreate
             * @methodOf lbServices.UserIdentity
             *
             * @description
             *
             * Replace an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `UserIdentity` object.)
             * </em>
             */
            "replaceOrCreate": {
              url: urlBase + "/userIdentities/replaceOrCreate",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.UserIdentity#upsertWithWhere
             * @methodOf lbServices.UserIdentity
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source based on the where criteria.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `UserIdentity` object.)
             * </em>
             */
            "upsertWithWhere": {
              url: urlBase + "/userIdentities/upsertWithWhere",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.UserIdentity#exists
             * @methodOf lbServices.UserIdentity
             *
             * @description
             *
             * Check whether a model instance exists in the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `exists` – `{boolean=}` -
             */
            "exists": {
              url: urlBase + "/userIdentities/:id/exists",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.UserIdentity#findById
             * @methodOf lbServices.UserIdentity
             *
             * @description
             *
             * Find a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `filter` – `{object=}` - Filter defining fields and include - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `UserIdentity` object.)
             * </em>
             */
            "findById": {
              url: urlBase + "/userIdentities/:id",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.UserIdentity#replaceById
             * @methodOf lbServices.UserIdentity
             *
             * @description
             *
             * Replace attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `UserIdentity` object.)
             * </em>
             */
            "replaceById": {
              url: urlBase + "/userIdentities/:id/replace",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.UserIdentity#find
             * @methodOf lbServices.UserIdentity
             *
             * @description
             *
             * Find all instances of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `UserIdentity` object.)
             * </em>
             */
            "find": {
              isArray: true,
              url: urlBase + "/userIdentities",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.UserIdentity#findOne
             * @methodOf lbServices.UserIdentity
             *
             * @description
             *
             * Find first instance of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `UserIdentity` object.)
             * </em>
             */
            "findOne": {
              url: urlBase + "/userIdentities/findOne",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.UserIdentity#updateAll
             * @methodOf lbServices.UserIdentity
             *
             * @description
             *
             * Update instances of the model matched by {{where}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Information related to the outcome of the operation
             */
            "updateAll": {
              url: urlBase + "/userIdentities/update",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.UserIdentity#deleteById
             * @methodOf lbServices.UserIdentity
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `UserIdentity` object.)
             * </em>
             */
            "deleteById": {
              url: urlBase + "/userIdentities/:id",
              method: "DELETE",
            },

            /**
             * @ngdoc method
             * @name lbServices.UserIdentity#count
             * @methodOf lbServices.UserIdentity
             *
             * @description
             *
             * Count instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
            "count": {
              url: urlBase + "/userIdentities/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.UserIdentity#prototype$patchAttributes
             * @methodOf lbServices.UserIdentity
             *
             * @description
             *
             * Patch attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - userIdentity id
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `UserIdentity` object.)
             * </em>
             */
            "prototype$patchAttributes": {
              url: urlBase + "/userIdentities/:id",
              method: "PATCH",
            },

            /**
             * @ngdoc method
             * @name lbServices.UserIdentity#createChangeStream
             * @methodOf lbServices.UserIdentity
             *
             * @description
             *
             * Create a change stream.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `changes` – `{ReadableStream=}` -
             */
            "createChangeStream": {
              url: urlBase + "/userIdentities/change-stream",
              method: "POST",
            },

            // INTERNAL. Use User.identities.findById() instead.
            "::findById::User::identities": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/users/:id/identities/:fk",
              method: "GET",
            },

            // INTERNAL. Use User.identities.destroyById() instead.
            "::destroyById::User::identities": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/users/:id/identities/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use User.identities.updateById() instead.
            "::updateById::User::identities": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/users/:id/identities/:fk",
              method: "PUT",
            },

            // INTERNAL. Use User.identities() instead.
            "::get::User::identities": {
              isArray: true,
              url: urlBase + "/users/:id/identities",
              method: "GET",
            },

            // INTERNAL. Use User.identities.create() instead.
            "::create::User::identities": {
              url: urlBase + "/users/:id/identities",
              method: "POST",
            },

            // INTERNAL. Use User.identities.createMany() instead.
            "::createMany::User::identities": {
              isArray: true,
              url: urlBase + "/users/:id/identities",
              method: "POST",
            },

            // INTERNAL. Use User.identities.destroyAll() instead.
            "::delete::User::identities": {
              url: urlBase + "/users/:id/identities",
              method: "DELETE",
            },

            // INTERNAL. Use User.identities.count() instead.
            "::count::User::identities": {
              url: urlBase + "/users/:id/identities/count",
              method: "GET",
            },
          }
        );



            /**
             * @ngdoc method
             * @name lbServices.UserIdentity#upsert
             * @methodOf lbServices.UserIdentity
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `UserIdentity` object.)
             * </em>
             */
        R["upsert"] = R["patchOrCreate"];

            /**
             * @ngdoc method
             * @name lbServices.UserIdentity#updateOrCreate
             * @methodOf lbServices.UserIdentity
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `UserIdentity` object.)
             * </em>
             */
        R["updateOrCreate"] = R["patchOrCreate"];

            /**
             * @ngdoc method
             * @name lbServices.UserIdentity#patchOrCreateWithWhere
             * @methodOf lbServices.UserIdentity
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source based on the where criteria.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `UserIdentity` object.)
             * </em>
             */
        R["patchOrCreateWithWhere"] = R["upsertWithWhere"];

            /**
             * @ngdoc method
             * @name lbServices.UserIdentity#update
             * @methodOf lbServices.UserIdentity
             *
             * @description
             *
             * Update instances of the model matched by {{where}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Information related to the outcome of the operation
             */
        R["update"] = R["updateAll"];

            /**
             * @ngdoc method
             * @name lbServices.UserIdentity#destroyById
             * @methodOf lbServices.UserIdentity
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `UserIdentity` object.)
             * </em>
             */
        R["destroyById"] = R["deleteById"];

            /**
             * @ngdoc method
             * @name lbServices.UserIdentity#removeById
             * @methodOf lbServices.UserIdentity
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `UserIdentity` object.)
             * </em>
             */
        R["removeById"] = R["deleteById"];

            /**
             * @ngdoc method
             * @name lbServices.UserIdentity#updateAttributes
             * @methodOf lbServices.UserIdentity
             *
             * @description
             *
             * Patch attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - userIdentity id
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `UserIdentity` object.)
             * </em>
             */
        R["updateAttributes"] = R["prototype$patchAttributes"];


        /**
        * @ngdoc property
        * @name lbServices.UserIdentity#modelName
        * @propertyOf lbServices.UserIdentity
        * @description
        * The name of the model represented by this $resource,
        * i.e. `UserIdentity`.
        */
        R.modelName = "UserIdentity";


            /**
             * @ngdoc method
             * @name lbServices.UserIdentity#user
             * @methodOf lbServices.UserIdentity
             *
             * @description
             *
             * Fetches belongsTo relation user.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - userIdentity id
             *
             *  - `options` – `{object=}` -
             *
             *  - `refresh` – `{boolean=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
        R.user = function() {
          var TargetResource = $injector.get("User");
          var action = TargetResource["::get::UserIdentity::user"];
          return action.apply(R, arguments);
        };


        return R;
      }]);

/**
 * @ngdoc object
 * @name lbServices.InstanceAcl
 * @header lbServices.InstanceAcl
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `InstanceAcl` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
  module.factory(
    "InstanceAcl",
    [
      'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
      function(LoopBackResource, LoopBackAuth, $injector, $q) {
        var R = LoopBackResource(
        urlBase + "/InstanceAcls/:id",
          { 'id': '@id' },
          {

            // INTERNAL. Use InstanceAcl.user() instead.
            "prototype$__get__user": {
              url: urlBase + "/InstanceAcls/:id/user",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.InstanceAcl#create
             * @methodOf lbServices.InstanceAcl
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `InstanceAcl` object.)
             * </em>
             */
            "create": {
              url: urlBase + "/InstanceAcls",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.InstanceAcl#createMany
             * @methodOf lbServices.InstanceAcl
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `InstanceAcl` object.)
             * </em>
             */
            "createMany": {
              isArray: true,
              url: urlBase + "/InstanceAcls",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.InstanceAcl#patchOrCreate
             * @methodOf lbServices.InstanceAcl
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `InstanceAcl` object.)
             * </em>
             */
            "patchOrCreate": {
              url: urlBase + "/InstanceAcls",
              method: "PATCH",
            },

            /**
             * @ngdoc method
             * @name lbServices.InstanceAcl#replaceOrCreate
             * @methodOf lbServices.InstanceAcl
             *
             * @description
             *
             * Replace an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `InstanceAcl` object.)
             * </em>
             */
            "replaceOrCreate": {
              url: urlBase + "/InstanceAcls/replaceOrCreate",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.InstanceAcl#upsertWithWhere
             * @methodOf lbServices.InstanceAcl
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source based on the where criteria.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `InstanceAcl` object.)
             * </em>
             */
            "upsertWithWhere": {
              url: urlBase + "/InstanceAcls/upsertWithWhere",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.InstanceAcl#exists
             * @methodOf lbServices.InstanceAcl
             *
             * @description
             *
             * Check whether a model instance exists in the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `exists` – `{boolean=}` -
             */
            "exists": {
              url: urlBase + "/InstanceAcls/:id/exists",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.InstanceAcl#findById
             * @methodOf lbServices.InstanceAcl
             *
             * @description
             *
             * Find a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `filter` – `{object=}` - Filter defining fields and include - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `InstanceAcl` object.)
             * </em>
             */
            "findById": {
              url: urlBase + "/InstanceAcls/:id",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.InstanceAcl#replaceById
             * @methodOf lbServices.InstanceAcl
             *
             * @description
             *
             * Replace attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `InstanceAcl` object.)
             * </em>
             */
            "replaceById": {
              url: urlBase + "/InstanceAcls/:id/replace",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.InstanceAcl#find
             * @methodOf lbServices.InstanceAcl
             *
             * @description
             *
             * Find all instances of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `InstanceAcl` object.)
             * </em>
             */
            "find": {
              isArray: true,
              url: urlBase + "/InstanceAcls",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.InstanceAcl#findOne
             * @methodOf lbServices.InstanceAcl
             *
             * @description
             *
             * Find first instance of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `InstanceAcl` object.)
             * </em>
             */
            "findOne": {
              url: urlBase + "/InstanceAcls/findOne",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.InstanceAcl#updateAll
             * @methodOf lbServices.InstanceAcl
             *
             * @description
             *
             * Update instances of the model matched by {{where}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Information related to the outcome of the operation
             */
            "updateAll": {
              url: urlBase + "/InstanceAcls/update",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.InstanceAcl#deleteById
             * @methodOf lbServices.InstanceAcl
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `InstanceAcl` object.)
             * </em>
             */
            "deleteById": {
              url: urlBase + "/InstanceAcls/:id",
              method: "DELETE",
            },

            /**
             * @ngdoc method
             * @name lbServices.InstanceAcl#count
             * @methodOf lbServices.InstanceAcl
             *
             * @description
             *
             * Count instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
            "count": {
              url: urlBase + "/InstanceAcls/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.InstanceAcl#prototype$patchAttributes
             * @methodOf lbServices.InstanceAcl
             *
             * @description
             *
             * Patch attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - InstanceAcl id
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `InstanceAcl` object.)
             * </em>
             */
            "prototype$patchAttributes": {
              url: urlBase + "/InstanceAcls/:id",
              method: "PATCH",
            },

            /**
             * @ngdoc method
             * @name lbServices.InstanceAcl#createChangeStream
             * @methodOf lbServices.InstanceAcl
             *
             * @description
             *
             * Create a change stream.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `changes` – `{ReadableStream=}` -
             */
            "createChangeStream": {
              url: urlBase + "/InstanceAcls/change-stream",
              method: "POST",
            },
          }
        );



            /**
             * @ngdoc method
             * @name lbServices.InstanceAcl#upsert
             * @methodOf lbServices.InstanceAcl
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `InstanceAcl` object.)
             * </em>
             */
        R["upsert"] = R["patchOrCreate"];

            /**
             * @ngdoc method
             * @name lbServices.InstanceAcl#updateOrCreate
             * @methodOf lbServices.InstanceAcl
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `InstanceAcl` object.)
             * </em>
             */
        R["updateOrCreate"] = R["patchOrCreate"];

            /**
             * @ngdoc method
             * @name lbServices.InstanceAcl#patchOrCreateWithWhere
             * @methodOf lbServices.InstanceAcl
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source based on the where criteria.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `InstanceAcl` object.)
             * </em>
             */
        R["patchOrCreateWithWhere"] = R["upsertWithWhere"];

            /**
             * @ngdoc method
             * @name lbServices.InstanceAcl#update
             * @methodOf lbServices.InstanceAcl
             *
             * @description
             *
             * Update instances of the model matched by {{where}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Information related to the outcome of the operation
             */
        R["update"] = R["updateAll"];

            /**
             * @ngdoc method
             * @name lbServices.InstanceAcl#destroyById
             * @methodOf lbServices.InstanceAcl
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `InstanceAcl` object.)
             * </em>
             */
        R["destroyById"] = R["deleteById"];

            /**
             * @ngdoc method
             * @name lbServices.InstanceAcl#removeById
             * @methodOf lbServices.InstanceAcl
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `InstanceAcl` object.)
             * </em>
             */
        R["removeById"] = R["deleteById"];

            /**
             * @ngdoc method
             * @name lbServices.InstanceAcl#updateAttributes
             * @methodOf lbServices.InstanceAcl
             *
             * @description
             *
             * Patch attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - InstanceAcl id
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `InstanceAcl` object.)
             * </em>
             */
        R["updateAttributes"] = R["prototype$patchAttributes"];


        /**
        * @ngdoc property
        * @name lbServices.InstanceAcl#modelName
        * @propertyOf lbServices.InstanceAcl
        * @description
        * The name of the model represented by this $resource,
        * i.e. `InstanceAcl`.
        */
        R.modelName = "InstanceAcl";


            /**
             * @ngdoc method
             * @name lbServices.InstanceAcl#user
             * @methodOf lbServices.InstanceAcl
             *
             * @description
             *
             * Fetches belongsTo relation user.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - InstanceAcl id
             *
             *  - `options` – `{object=}` -
             *
             *  - `refresh` – `{boolean=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
        R.user = function() {
          var TargetResource = $injector.get("User");
          var action = TargetResource["::get::InstanceAcl::user"];
          return action.apply(R, arguments);
        };


        return R;
      }]);

/**
 * @ngdoc object
 * @name lbServices.Picture
 * @header lbServices.Picture
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Picture` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
  module.factory(
    "Picture",
    [
      'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
      function(LoopBackResource, LoopBackAuth, $injector, $q) {
        var R = LoopBackResource(
        urlBase + "/Pictures/:id",
          { 'id': '@id' },
          {

            // INTERNAL. Use Picture.tags.link() instead.
            "prototype$__link__tags": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Pictures/:id/tags/rel/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Picture.tags.unlink() instead.
            "prototype$__unlink__tags": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Pictures/:id/tags/rel/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Picture.tags.exists() instead.
            "prototype$__exists__tags": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Pictures/:id/tags/rel/:fk",
              method: "HEAD",
            },

            // INTERNAL. Use Picture.tags() instead.
            "prototype$__get__tags": {
              isArray: true,
              url: urlBase + "/Pictures/:id/tags",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Picture#findById
             * @methodOf lbServices.Picture
             *
             * @description
             *
             * Find a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `filter` – `{object=}` - Filter defining fields and include - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Picture` object.)
             * </em>
             */
            "findById": {
              url: urlBase + "/Pictures/:id",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Picture#count
             * @methodOf lbServices.Picture
             *
             * @description
             *
             * Count instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
            "count": {
              url: urlBase + "/Pictures/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Picture#isHashUnique
             * @methodOf lbServices.Picture
             *
             * @description
             *
             * <em>
             * (The remote method definition does not provide any description.)
             * </em>
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `req` – `{object=}` -
             *
             *  - `res` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `result` – `{object=}` -
             */
            "isHashUnique": {
              url: urlBase + "/Pictures/isHashUnique",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Picture#download
             * @methodOf lbServices.Picture
             *
             * @description
             *
             * <em>
             * (The remote method definition does not provide any description.)
             * </em>
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `sha256` – `{string}` -
             *
             *  - `segmentId` – `{string}` -
             *
             *  - `pictureId` – `{string}` -
             *
             *  - `timestamp_jpg` – `{string}` -
             *
             *  - `req` – `{object=}` -
             *
             *  - `res` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `` – `{undefined=}` -
             */
            "download": {
              url: urlBase + "/Pictures/download/:sha256/:segmentId/:pictureId/:timestamp_jpg",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Picture#thumb
             * @methodOf lbServices.Picture
             *
             * @description
             *
             * <em>
             * (The remote method definition does not provide any description.)
             * </em>
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `sha256` – `{string}` -
             *
             *  - `segmentId` – `{string}` -
             *
             *  - `pictureId` – `{string}` -
             *
             *  - `timestamp_jpg` – `{string}` -
             *
             *  - `req` – `{object=}` -
             *
             *  - `res` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `` – `{undefined=}` -
             */
            "thumb": {
              url: urlBase + "/Pictures/thumb/:sha256/:segmentId/:pictureId/:timestamp_jpg",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Picture#exif
             * @methodOf lbServices.Picture
             *
             * @description
             *
             * <em>
             * (The remote method definition does not provide any description.)
             * </em>
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `sha256` – `{string}` -
             *
             *  - `segmentId` – `{string}` -
             *
             *  - `pictureId` – `{string}` -
             *
             *  - `timestamp_jpg` – `{string}` -
             *
             *  - `req` – `{object=}` -
             *
             *  - `res` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `` – `{undefined=}` -
             */
            "exif": {
              url: urlBase + "/Pictures/exif/:sha256/:segmentId/:pictureId/:timestamp_jpg",
              method: "GET",
            },

            // INTERNAL. Use Segment.pictures() instead.
            "::get::Segment::pictures": {
              isArray: true,
              url: urlBase + "/Segments/:id/pictures",
              method: "GET",
            },

            // INTERNAL. Use Segment.pictures.count() instead.
            "::count::Segment::pictures": {
              url: urlBase + "/Segments/:id/pictures/count",
              method: "GET",
            },

            // INTERNAL. Use POI.pictures.findById() instead.
            "::findById::POI::pictures": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/POIs/:id/pictures/:fk",
              method: "GET",
            },

            // INTERNAL. Use POI.pictures.destroyById() instead.
            "::destroyById::POI::pictures": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/POIs/:id/pictures/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use POI.pictures.updateById() instead.
            "::updateById::POI::pictures": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/POIs/:id/pictures/:fk",
              method: "PUT",
            },

            // INTERNAL. Use POI.pictures.link() instead.
            "::link::POI::pictures": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/POIs/:id/pictures/rel/:fk",
              method: "PUT",
            },

            // INTERNAL. Use POI.pictures.unlink() instead.
            "::unlink::POI::pictures": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/POIs/:id/pictures/rel/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use POI.pictures.exists() instead.
            "::exists::POI::pictures": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/POIs/:id/pictures/rel/:fk",
              method: "HEAD",
            },

            // INTERNAL. Use POI.pictures() instead.
            "::get::POI::pictures": {
              isArray: true,
              url: urlBase + "/POIs/:id/pictures",
              method: "GET",
            },

            // INTERNAL. Use POI.pictures.create() instead.
            "::create::POI::pictures": {
              url: urlBase + "/POIs/:id/pictures",
              method: "POST",
            },

            // INTERNAL. Use POI.pictures.createMany() instead.
            "::createMany::POI::pictures": {
              isArray: true,
              url: urlBase + "/POIs/:id/pictures",
              method: "POST",
            },

            // INTERNAL. Use POI.pictures.destroyAll() instead.
            "::delete::POI::pictures": {
              url: urlBase + "/POIs/:id/pictures",
              method: "DELETE",
            },

            // INTERNAL. Use POI.pictures.count() instead.
            "::count::POI::pictures": {
              url: urlBase + "/POIs/:id/pictures/count",
              method: "GET",
            },

            // INTERNAL. Use Tag.pictures.findById() instead.
            "::findById::Tag::pictures": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Tags/:id/pictures/:fk",
              method: "GET",
            },

            // INTERNAL. Use Tag.pictures.destroyById() instead.
            "::destroyById::Tag::pictures": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Tags/:id/pictures/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Tag.pictures.updateById() instead.
            "::updateById::Tag::pictures": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Tags/:id/pictures/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Tag.pictures.link() instead.
            "::link::Tag::pictures": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Tags/:id/pictures/rel/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Tag.pictures.unlink() instead.
            "::unlink::Tag::pictures": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Tags/:id/pictures/rel/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Tag.pictures.exists() instead.
            "::exists::Tag::pictures": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Tags/:id/pictures/rel/:fk",
              method: "HEAD",
            },

            // INTERNAL. Use Tag.pictures() instead.
            "::get::Tag::pictures": {
              isArray: true,
              url: urlBase + "/Tags/:id/pictures",
              method: "GET",
            },

            // INTERNAL. Use Tag.pictures.create() instead.
            "::create::Tag::pictures": {
              url: urlBase + "/Tags/:id/pictures",
              method: "POST",
            },

            // INTERNAL. Use Tag.pictures.createMany() instead.
            "::createMany::Tag::pictures": {
              isArray: true,
              url: urlBase + "/Tags/:id/pictures",
              method: "POST",
            },

            // INTERNAL. Use Tag.pictures.destroyAll() instead.
            "::delete::Tag::pictures": {
              url: urlBase + "/Tags/:id/pictures",
              method: "DELETE",
            },

            // INTERNAL. Use Tag.pictures.count() instead.
            "::count::Tag::pictures": {
              url: urlBase + "/Tags/:id/pictures/count",
              method: "GET",
            },

            // INTERNAL. Use Pose.picture() instead.
            "::get::Pose::picture": {
              url: urlBase + "/Poses/:id/picture",
              method: "GET",
            },

            // INTERNAL. Use PictureTag.picture() instead.
            "::get::PictureTag::picture": {
              url: urlBase + "/PictureTags/:id/picture",
              method: "GET",
            },
          }
        );




        /**
        * @ngdoc property
        * @name lbServices.Picture#modelName
        * @propertyOf lbServices.Picture
        * @description
        * The name of the model represented by this $resource,
        * i.e. `Picture`.
        */
        R.modelName = "Picture";

    /**
     * @ngdoc object
     * @name lbServices.Picture.tags
     * @header lbServices.Picture.tags
     * @object
     * @description
     *
     * The object `Picture.tags` groups methods
     * manipulating `Tag` instances related to `Picture`.
     *
     * Call {@link lbServices.Picture#tags Picture.tags()}
     * to query all related instances.
     */


            /**
             * @ngdoc method
             * @name lbServices.Picture#tags
             * @methodOf lbServices.Picture
             *
             * @description
             *
             * Queries tags of Picture.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Picture id
             *
             *  - `options` – `{object=}` -
             *
             *  - `filter` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Tag` object.)
             * </em>
             */
        R.tags = function() {
          var TargetResource = $injector.get("Tag");
          var action = TargetResource["::get::Picture::tags"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Picture.tags#exists
             * @methodOf lbServices.Picture.tags
             *
             * @description
             *
             * Check the existence of tags relation to an item by id.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Picture id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for tags
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Tag` object.)
             * </em>
             */
        R.tags.exists = function() {
          var TargetResource = $injector.get("Tag");
          var action = TargetResource["::exists::Picture::tags"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Picture.tags#link
             * @methodOf lbServices.Picture.tags
             *
             * @description
             *
             * Add a related item by id for tags.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Picture id
             *
             *  - `fk` – `{*}` - Foreign key for tags
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Tag` object.)
             * </em>
             */
        R.tags.link = function() {
          var TargetResource = $injector.get("Tag");
          var action = TargetResource["::link::Picture::tags"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Picture.tags#unlink
             * @methodOf lbServices.Picture.tags
             *
             * @description
             *
             * Remove the tags relation to an item by id.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Picture id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for tags
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.tags.unlink = function() {
          var TargetResource = $injector.get("Tag");
          var action = TargetResource["::unlink::Picture::tags"];
          return action.apply(R, arguments);
        };


        return R;
      }]);

/**
 * @ngdoc object
 * @name lbServices.Segment
 * @header lbServices.Segment
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Segment` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
  module.factory(
    "Segment",
    [
      'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
      function(LoopBackResource, LoopBackAuth, $injector, $q) {
        var R = LoopBackResource(
        urlBase + "/Segments/:id",
          { 'id': '@id' },
          {

            // INTERNAL. Use Segment.tags.link() instead.
            "prototype$__link__tags": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Segments/:id/tags/rel/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Segment.tags.unlink() instead.
            "prototype$__unlink__tags": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Segments/:id/tags/rel/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Segment.tags.exists() instead.
            "prototype$__exists__tags": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Segments/:id/tags/rel/:fk",
              method: "HEAD",
            },

            // INTERNAL. Use Segment.pictures() instead.
            "prototype$__get__pictures": {
              isArray: true,
              url: urlBase + "/Segments/:id/pictures",
              method: "GET",
            },

            // INTERNAL. Use Segment.pictures.count() instead.
            "prototype$__count__pictures": {
              url: urlBase + "/Segments/:id/pictures/count",
              method: "GET",
            },

            // INTERNAL. Use Segment.tags() instead.
            "prototype$__get__tags": {
              isArray: true,
              url: urlBase + "/Segments/:id/tags",
              method: "GET",
            },

            // INTERNAL. Use Segment.jobs() instead.
            "prototype$__get__jobs": {
              isArray: true,
              url: urlBase + "/Segments/:id/jobs",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Segment#findById
             * @methodOf lbServices.Segment
             *
             * @description
             *
             * Find a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `filter` – `{object=}` - Filter defining fields and include - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Segment` object.)
             * </em>
             */
            "findById": {
              url: urlBase + "/Segments/:id",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Segment#find
             * @methodOf lbServices.Segment
             *
             * @description
             *
             * Find all instances of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Segment` object.)
             * </em>
             */
            "find": {
              isArray: true,
              url: urlBase + "/Segments",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Segment#findOne
             * @methodOf lbServices.Segment
             *
             * @description
             *
             * Find first instance of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Segment` object.)
             * </em>
             */
            "findOne": {
              url: urlBase + "/Segments/findOne",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Segment#count
             * @methodOf lbServices.Segment
             *
             * @description
             *
             * Count instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
            "count": {
              url: urlBase + "/Segments/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Segment#createChangeStream
             * @methodOf lbServices.Segment
             *
             * @description
             *
             * Create a change stream.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `changes` – `{ReadableStream=}` -
             */
            "createChangeStream": {
              url: urlBase + "/Segments/change-stream",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Segment#preview
             * @methodOf lbServices.Segment
             *
             * @description
             *
             * <em>
             * (The remote method definition does not provide any description.)
             * </em>
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `segmentId` – `{string}` -
             *
             *  - `timestamp` – `{string}` -
             *
             *  - `previewId` – `{string}` -
             *
             *  - `req` – `{object=}` -
             *
             *  - `res` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `` – `{undefined=}` -
             */
            "preview": {
              url: urlBase + "/Segments/preview/:segmentId/:timestamp/:previewId",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Segment#viewer
             * @methodOf lbServices.Segment
             *
             * @description
             *
             * <em>
             * (The remote method definition does not provide any description.)
             * </em>
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `req` – `{object=}` -
             *
             *  - `res` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `` – `{undefined=}` -
             */
            "viewer": {
              url: urlBase + "/Segments/viewer/:segmentId/:timestamp/*",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Segment#path
             * @methodOf lbServices.Segment
             *
             * @description
             *
             * <em>
             * (The remote method definition does not provide any description.)
             * </em>
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `segmentId` – `{string}` -
             *
             *  - `req` – `{object=}` -
             *
             *  - `res` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `` – `{undefined=}` -
             */
            "path": {
              url: urlBase + "/Segments/path/:segmentId",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Segment#injectPointcloud
             * @methodOf lbServices.Segment
             *
             * @description
             *
             * <em>
             * (The remote method definition does not provide any description.)
             * </em>
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `segmentId` – `{string}` -
             *
             *  - `req` – `{object=}` -
             *
             *  - `res` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `` – `{undefined=}` -
             */
            "injectPointcloud": {
              url: urlBase + "/Segments/inject-pointcloud/:segmentId",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Segment#purge
             * @methodOf lbServices.Segment
             *
             * @description
             *
             * <em>
             * (The remote method definition does not provide any description.)
             * </em>
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `segmentId` – `{string}` -
             *
             *  - `req` – `{object=}` -
             *
             *  - `res` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `` – `{undefined=}` -
             */
            "purge": {
              url: urlBase + "/Segments/purge/:segmentId",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Segment#removePointcloud
             * @methodOf lbServices.Segment
             *
             * @description
             *
             * <em>
             * (The remote method definition does not provide any description.)
             * </em>
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `segmentId` – `{string}` -
             *
             *  - `req` – `{object=}` -
             *
             *  - `res` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `` – `{undefined=}` -
             */
            "removePointcloud": {
              url: urlBase + "/Segments/remove-pointcloud/:segmentId",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Segment#_find
             * @methodOf lbServices.Segment
             *
             * @description
             *
             * <em>
             * (The remote method definition does not provide any description.)
             * </em>
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object}` -
             *
             *  - `req` – `{object=}` -
             *
             *  - `res` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Segment` object.)
             * </em>
             */
            "_find": {
              isArray: true,
              url: urlBase + "/Segments/_find",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Segment#proceed
             * @methodOf lbServices.Segment
             *
             * @description
             *
             * <em>
             * (The remote method definition does not provide any description.)
             * </em>
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{string}` -
             *
             *  - `status` – `{string}` -
             *
             *  - `status_timestamp` – `{number}` -
             *
             *  - `operation` – `{string}` -
             *
             *  - `req` – `{object=}` -
             *
             *  - `res` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `status` – `{string=}` -
             *
             *  - `status_timestamp` – `{number=}` -
             */
            "proceed": {
              url: urlBase + "/Segments/proceed/:id/:status/:status_timestamp/:operation",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Segment#merge
             * @methodOf lbServices.Segment
             *
             * @description
             *
             * <em>
             * (The remote method definition does not provide any description.)
             * </em>
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `segmentList` – `{*}` -
             *
             *  - `req` – `{object=}` -
             *
             *  - `res` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `segment` – `{object=}` -
             */
            "merge": {
              url: urlBase + "/Segments/merge/:segmentList",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Segment#split
             * @methodOf lbServices.Segment
             *
             * @description
             *
             * <em>
             * (The remote method definition does not provide any description.)
             * </em>
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{string}` -
             *
             *  - `timestamp` – `{string}` -
             *
             *  - `req` – `{object=}` -
             *
             *  - `res` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `segment` – `{object=}` -
             */
            "split": {
              url: urlBase + "/Segments/:id/split/:timestamp",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Segment#files
             * @methodOf lbServices.Segment
             *
             * @description
             *
             * <em>
             * (The remote method definition does not provide any description.)
             * </em>
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{string}` -
             *
             *  - `req` – `{object=}` -
             *
             *  - `res` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `files` – `{*=}` -
             */
            "files": {
              url: urlBase + "/Segments/:id/files",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Segment#download
             * @methodOf lbServices.Segment
             *
             * @description
             *
             * <em>
             * (The remote method definition does not provide any description.)
             * </em>
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{string}` -
             *
             *  - `requestedPath` – `{string}` -
             *
             *  - `req` – `{object=}` -
             *
             *  - `res` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "download": {
              url: urlBase + "/Segments/:id/download/:requestedPath",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Segment#ply
             * @methodOf lbServices.Segment
             *
             * @description
             *
             * <em>
             * (The remote method definition does not provide any description.)
             * </em>
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{string}` -
             *
             *  - `req` – `{object=}` -
             *
             *  - `res` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "ply": {
              url: urlBase + "/Segments/:id/ply",
              method: "GET",
            },

            // INTERNAL. Use User.segments.findById() instead.
            "::findById::User::segments": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/users/:id/segments/:fk",
              method: "GET",
            },

            // INTERNAL. Use User.segments.destroyById() instead.
            "::destroyById::User::segments": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/users/:id/segments/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use User.segments.updateById() instead.
            "::updateById::User::segments": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/users/:id/segments/:fk",
              method: "PUT",
            },

            // INTERNAL. Use User.segments() instead.
            "::get::User::segments": {
              isArray: true,
              url: urlBase + "/users/:id/segments",
              method: "GET",
            },

            // INTERNAL. Use User.segments.create() instead.
            "::create::User::segments": {
              url: urlBase + "/users/:id/segments",
              method: "POST",
            },

            // INTERNAL. Use User.segments.createMany() instead.
            "::createMany::User::segments": {
              isArray: true,
              url: urlBase + "/users/:id/segments",
              method: "POST",
            },

            // INTERNAL. Use User.segments.destroyAll() instead.
            "::delete::User::segments": {
              url: urlBase + "/users/:id/segments",
              method: "DELETE",
            },

            // INTERNAL. Use User.segments.count() instead.
            "::count::User::segments": {
              url: urlBase + "/users/:id/segments/count",
              method: "GET",
            },

            // INTERNAL. Use POI.segments.findById() instead.
            "::findById::POI::segments": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/POIs/:id/segments/:fk",
              method: "GET",
            },

            // INTERNAL. Use POI.segments.destroyById() instead.
            "::destroyById::POI::segments": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/POIs/:id/segments/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use POI.segments.updateById() instead.
            "::updateById::POI::segments": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/POIs/:id/segments/:fk",
              method: "PUT",
            },

            // INTERNAL. Use POI.segments.link() instead.
            "::link::POI::segments": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/POIs/:id/segments/rel/:fk",
              method: "PUT",
            },

            // INTERNAL. Use POI.segments.unlink() instead.
            "::unlink::POI::segments": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/POIs/:id/segments/rel/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use POI.segments.exists() instead.
            "::exists::POI::segments": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/POIs/:id/segments/rel/:fk",
              method: "HEAD",
            },

            // INTERNAL. Use POI.segments() instead.
            "::get::POI::segments": {
              isArray: true,
              url: urlBase + "/POIs/:id/segments",
              method: "GET",
            },

            // INTERNAL. Use POI.segments.create() instead.
            "::create::POI::segments": {
              url: urlBase + "/POIs/:id/segments",
              method: "POST",
            },

            // INTERNAL. Use POI.segments.createMany() instead.
            "::createMany::POI::segments": {
              isArray: true,
              url: urlBase + "/POIs/:id/segments",
              method: "POST",
            },

            // INTERNAL. Use POI.segments.destroyAll() instead.
            "::delete::POI::segments": {
              url: urlBase + "/POIs/:id/segments",
              method: "DELETE",
            },

            // INTERNAL. Use POI.segments.count() instead.
            "::count::POI::segments": {
              url: urlBase + "/POIs/:id/segments/count",
              method: "GET",
            },

            // INTERNAL. Use Tag.segments.findById() instead.
            "::findById::Tag::segments": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Tags/:id/segments/:fk",
              method: "GET",
            },

            // INTERNAL. Use Tag.segments.destroyById() instead.
            "::destroyById::Tag::segments": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Tags/:id/segments/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Tag.segments.updateById() instead.
            "::updateById::Tag::segments": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Tags/:id/segments/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Tag.segments.link() instead.
            "::link::Tag::segments": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Tags/:id/segments/rel/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Tag.segments.unlink() instead.
            "::unlink::Tag::segments": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Tags/:id/segments/rel/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Tag.segments.exists() instead.
            "::exists::Tag::segments": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Tags/:id/segments/rel/:fk",
              method: "HEAD",
            },

            // INTERNAL. Use Tag.segments() instead.
            "::get::Tag::segments": {
              isArray: true,
              url: urlBase + "/Tags/:id/segments",
              method: "GET",
            },

            // INTERNAL. Use Tag.segments.create() instead.
            "::create::Tag::segments": {
              url: urlBase + "/Tags/:id/segments",
              method: "POST",
            },

            // INTERNAL. Use Tag.segments.createMany() instead.
            "::createMany::Tag::segments": {
              isArray: true,
              url: urlBase + "/Tags/:id/segments",
              method: "POST",
            },

            // INTERNAL. Use Tag.segments.destroyAll() instead.
            "::delete::Tag::segments": {
              url: urlBase + "/Tags/:id/segments",
              method: "DELETE",
            },

            // INTERNAL. Use Tag.segments.count() instead.
            "::count::Tag::segments": {
              url: urlBase + "/Tags/:id/segments/count",
              method: "GET",
            },

            // INTERNAL. Use Job.segment() instead.
            "::get::Job::segment": {
              url: urlBase + "/jobs/:id/segment",
              method: "GET",
            },
          }
        );




        /**
        * @ngdoc property
        * @name lbServices.Segment#modelName
        * @propertyOf lbServices.Segment
        * @description
        * The name of the model represented by this $resource,
        * i.e. `Segment`.
        */
        R.modelName = "Segment";

    /**
     * @ngdoc object
     * @name lbServices.Segment.tags
     * @header lbServices.Segment.tags
     * @object
     * @description
     *
     * The object `Segment.tags` groups methods
     * manipulating `Tag` instances related to `Segment`.
     *
     * Call {@link lbServices.Segment#tags Segment.tags()}
     * to query all related instances.
     */


            /**
             * @ngdoc method
             * @name lbServices.Segment#tags
             * @methodOf lbServices.Segment
             *
             * @description
             *
             * Queries tags of Segment.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Segment id
             *
             *  - `options` – `{object=}` -
             *
             *  - `filter` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Tag` object.)
             * </em>
             */
        R.tags = function() {
          var TargetResource = $injector.get("Tag");
          var action = TargetResource["::get::Segment::tags"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Segment.tags#exists
             * @methodOf lbServices.Segment.tags
             *
             * @description
             *
             * Check the existence of tags relation to an item by id.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Segment id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for tags
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Tag` object.)
             * </em>
             */
        R.tags.exists = function() {
          var TargetResource = $injector.get("Tag");
          var action = TargetResource["::exists::Segment::tags"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Segment.tags#link
             * @methodOf lbServices.Segment.tags
             *
             * @description
             *
             * Add a related item by id for tags.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Segment id
             *
             *  - `fk` – `{*}` - Foreign key for tags
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Tag` object.)
             * </em>
             */
        R.tags.link = function() {
          var TargetResource = $injector.get("Tag");
          var action = TargetResource["::link::Segment::tags"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Segment.tags#unlink
             * @methodOf lbServices.Segment.tags
             *
             * @description
             *
             * Remove the tags relation to an item by id.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Segment id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for tags
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.tags.unlink = function() {
          var TargetResource = $injector.get("Tag");
          var action = TargetResource["::unlink::Segment::tags"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Segment.pictures
     * @header lbServices.Segment.pictures
     * @object
     * @description
     *
     * The object `Segment.pictures` groups methods
     * manipulating `Picture` instances related to `Segment`.
     *
     * Call {@link lbServices.Segment#pictures Segment.pictures()}
     * to query all related instances.
     */


            /**
             * @ngdoc method
             * @name lbServices.Segment#pictures
             * @methodOf lbServices.Segment
             *
             * @description
             *
             * Queries pictures of Segment.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Segment id
             *
             *  - `options` – `{object=}` -
             *
             *  - `filter` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Picture` object.)
             * </em>
             */
        R.pictures = function() {
          var TargetResource = $injector.get("Picture");
          var action = TargetResource["::get::Segment::pictures"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Segment.pictures#count
             * @methodOf lbServices.Segment.pictures
             *
             * @description
             *
             * Counts pictures of Segment.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Segment id
             *
             *  - `options` – `{object=}` -
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
        R.pictures.count = function() {
          var TargetResource = $injector.get("Picture");
          var action = TargetResource["::count::Segment::pictures"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Segment#jobs
             * @methodOf lbServices.Segment
             *
             * @description
             *
             * Queries jobs of Segment.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Segment id
             *
             *  - `options` – `{object=}` -
             *
             *  - `filter` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Job` object.)
             * </em>
             */
        R.jobs = function() {
          var TargetResource = $injector.get("Job");
          var action = TargetResource["::get::Segment::jobs"];
          return action.apply(R, arguments);
        };


        return R;
      }]);

/**
 * @ngdoc object
 * @name lbServices.POI
 * @header lbServices.POI
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `POI` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
  module.factory(
    "POI",
    [
      'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
      function(LoopBackResource, LoopBackAuth, $injector, $q) {
        var R = LoopBackResource(
        urlBase + "/POIs/:id",
          { 'id': '@id' },
          {

            // INTERNAL. Use POI.segments.findById() instead.
            "prototype$__findById__segments": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/POIs/:id/segments/:fk",
              method: "GET",
            },

            // INTERNAL. Use POI.segments.destroyById() instead.
            "prototype$__destroyById__segments": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/POIs/:id/segments/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use POI.segments.updateById() instead.
            "prototype$__updateById__segments": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/POIs/:id/segments/:fk",
              method: "PUT",
            },

            // INTERNAL. Use POI.segments.link() instead.
            "prototype$__link__segments": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/POIs/:id/segments/rel/:fk",
              method: "PUT",
            },

            // INTERNAL. Use POI.segments.unlink() instead.
            "prototype$__unlink__segments": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/POIs/:id/segments/rel/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use POI.segments.exists() instead.
            "prototype$__exists__segments": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/POIs/:id/segments/rel/:fk",
              method: "HEAD",
            },

            // INTERNAL. Use POI.pictures.findById() instead.
            "prototype$__findById__pictures": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/POIs/:id/pictures/:fk",
              method: "GET",
            },

            // INTERNAL. Use POI.pictures.destroyById() instead.
            "prototype$__destroyById__pictures": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/POIs/:id/pictures/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use POI.pictures.updateById() instead.
            "prototype$__updateById__pictures": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/POIs/:id/pictures/:fk",
              method: "PUT",
            },

            // INTERNAL. Use POI.pictures.link() instead.
            "prototype$__link__pictures": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/POIs/:id/pictures/rel/:fk",
              method: "PUT",
            },

            // INTERNAL. Use POI.pictures.unlink() instead.
            "prototype$__unlink__pictures": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/POIs/:id/pictures/rel/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use POI.pictures.exists() instead.
            "prototype$__exists__pictures": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/POIs/:id/pictures/rel/:fk",
              method: "HEAD",
            },

            // INTERNAL. Use POI.user() instead.
            "prototype$__get__user": {
              url: urlBase + "/POIs/:id/user",
              method: "GET",
            },

            // INTERNAL. Use POI.segments() instead.
            "prototype$__get__segments": {
              isArray: true,
              url: urlBase + "/POIs/:id/segments",
              method: "GET",
            },

            // INTERNAL. Use POI.segments.create() instead.
            "prototype$__create__segments": {
              url: urlBase + "/POIs/:id/segments",
              method: "POST",
            },

            // INTERNAL. Use POI.segments.destroyAll() instead.
            "prototype$__delete__segments": {
              url: urlBase + "/POIs/:id/segments",
              method: "DELETE",
            },

            // INTERNAL. Use POI.segments.count() instead.
            "prototype$__count__segments": {
              url: urlBase + "/POIs/:id/segments/count",
              method: "GET",
            },

            // INTERNAL. Use POI.pictures() instead.
            "prototype$__get__pictures": {
              isArray: true,
              url: urlBase + "/POIs/:id/pictures",
              method: "GET",
            },

            // INTERNAL. Use POI.pictures.create() instead.
            "prototype$__create__pictures": {
              url: urlBase + "/POIs/:id/pictures",
              method: "POST",
            },

            // INTERNAL. Use POI.pictures.destroyAll() instead.
            "prototype$__delete__pictures": {
              url: urlBase + "/POIs/:id/pictures",
              method: "DELETE",
            },

            // INTERNAL. Use POI.pictures.count() instead.
            "prototype$__count__pictures": {
              url: urlBase + "/POIs/:id/pictures/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.POI#create
             * @methodOf lbServices.POI
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `POI` object.)
             * </em>
             */
            "create": {
              url: urlBase + "/POIs",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.POI#createMany
             * @methodOf lbServices.POI
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `POI` object.)
             * </em>
             */
            "createMany": {
              isArray: true,
              url: urlBase + "/POIs",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.POI#patchOrCreate
             * @methodOf lbServices.POI
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `POI` object.)
             * </em>
             */
            "patchOrCreate": {
              url: urlBase + "/POIs",
              method: "PATCH",
            },

            /**
             * @ngdoc method
             * @name lbServices.POI#replaceOrCreate
             * @methodOf lbServices.POI
             *
             * @description
             *
             * Replace an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `POI` object.)
             * </em>
             */
            "replaceOrCreate": {
              url: urlBase + "/POIs/replaceOrCreate",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.POI#upsertWithWhere
             * @methodOf lbServices.POI
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source based on the where criteria.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `POI` object.)
             * </em>
             */
            "upsertWithWhere": {
              url: urlBase + "/POIs/upsertWithWhere",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.POI#exists
             * @methodOf lbServices.POI
             *
             * @description
             *
             * Check whether a model instance exists in the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `exists` – `{boolean=}` -
             */
            "exists": {
              url: urlBase + "/POIs/:id/exists",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.POI#findById
             * @methodOf lbServices.POI
             *
             * @description
             *
             * Find a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `filter` – `{object=}` - Filter defining fields and include - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `POI` object.)
             * </em>
             */
            "findById": {
              url: urlBase + "/POIs/:id",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.POI#replaceById
             * @methodOf lbServices.POI
             *
             * @description
             *
             * Replace attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `POI` object.)
             * </em>
             */
            "replaceById": {
              url: urlBase + "/POIs/:id/replace",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.POI#find
             * @methodOf lbServices.POI
             *
             * @description
             *
             * Find all instances of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `POI` object.)
             * </em>
             */
            "find": {
              isArray: true,
              url: urlBase + "/POIs",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.POI#findOne
             * @methodOf lbServices.POI
             *
             * @description
             *
             * Find first instance of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `POI` object.)
             * </em>
             */
            "findOne": {
              url: urlBase + "/POIs/findOne",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.POI#updateAll
             * @methodOf lbServices.POI
             *
             * @description
             *
             * Update instances of the model matched by {{where}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Information related to the outcome of the operation
             */
            "updateAll": {
              url: urlBase + "/POIs/update",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.POI#deleteById
             * @methodOf lbServices.POI
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `POI` object.)
             * </em>
             */
            "deleteById": {
              url: urlBase + "/POIs/:id",
              method: "DELETE",
            },

            /**
             * @ngdoc method
             * @name lbServices.POI#count
             * @methodOf lbServices.POI
             *
             * @description
             *
             * Count instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
            "count": {
              url: urlBase + "/POIs/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.POI#prototype$patchAttributes
             * @methodOf lbServices.POI
             *
             * @description
             *
             * Patch attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - POI id
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `POI` object.)
             * </em>
             */
            "prototype$patchAttributes": {
              url: urlBase + "/POIs/:id",
              method: "PATCH",
            },

            /**
             * @ngdoc method
             * @name lbServices.POI#createChangeStream
             * @methodOf lbServices.POI
             *
             * @description
             *
             * Create a change stream.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `changes` – `{ReadableStream=}` -
             */
            "createChangeStream": {
              url: urlBase + "/POIs/change-stream",
              method: "POST",
            },
          }
        );



            /**
             * @ngdoc method
             * @name lbServices.POI#upsert
             * @methodOf lbServices.POI
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `POI` object.)
             * </em>
             */
        R["upsert"] = R["patchOrCreate"];

            /**
             * @ngdoc method
             * @name lbServices.POI#updateOrCreate
             * @methodOf lbServices.POI
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `POI` object.)
             * </em>
             */
        R["updateOrCreate"] = R["patchOrCreate"];

            /**
             * @ngdoc method
             * @name lbServices.POI#patchOrCreateWithWhere
             * @methodOf lbServices.POI
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source based on the where criteria.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `POI` object.)
             * </em>
             */
        R["patchOrCreateWithWhere"] = R["upsertWithWhere"];

            /**
             * @ngdoc method
             * @name lbServices.POI#update
             * @methodOf lbServices.POI
             *
             * @description
             *
             * Update instances of the model matched by {{where}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Information related to the outcome of the operation
             */
        R["update"] = R["updateAll"];

            /**
             * @ngdoc method
             * @name lbServices.POI#destroyById
             * @methodOf lbServices.POI
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `POI` object.)
             * </em>
             */
        R["destroyById"] = R["deleteById"];

            /**
             * @ngdoc method
             * @name lbServices.POI#removeById
             * @methodOf lbServices.POI
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `POI` object.)
             * </em>
             */
        R["removeById"] = R["deleteById"];

            /**
             * @ngdoc method
             * @name lbServices.POI#updateAttributes
             * @methodOf lbServices.POI
             *
             * @description
             *
             * Patch attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - POI id
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `POI` object.)
             * </em>
             */
        R["updateAttributes"] = R["prototype$patchAttributes"];


        /**
        * @ngdoc property
        * @name lbServices.POI#modelName
        * @propertyOf lbServices.POI
        * @description
        * The name of the model represented by this $resource,
        * i.e. `POI`.
        */
        R.modelName = "POI";

    /**
     * @ngdoc object
     * @name lbServices.POI.segments
     * @header lbServices.POI.segments
     * @object
     * @description
     *
     * The object `POI.segments` groups methods
     * manipulating `Segment` instances related to `POI`.
     *
     * Call {@link lbServices.POI#segments POI.segments()}
     * to query all related instances.
     */


            /**
             * @ngdoc method
             * @name lbServices.POI#segments
             * @methodOf lbServices.POI
             *
             * @description
             *
             * Queries segments of POI.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - POI id
             *
             *  - `options` – `{object=}` -
             *
             *  - `filter` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Segment` object.)
             * </em>
             */
        R.segments = function() {
          var TargetResource = $injector.get("Segment");
          var action = TargetResource["::get::POI::segments"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.POI.segments#count
             * @methodOf lbServices.POI.segments
             *
             * @description
             *
             * Counts segments of POI.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - POI id
             *
             *  - `options` – `{object=}` -
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
        R.segments.count = function() {
          var TargetResource = $injector.get("Segment");
          var action = TargetResource["::count::POI::segments"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.POI.segments#create
             * @methodOf lbServices.POI.segments
             *
             * @description
             *
             * Creates a new instance in segments of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - POI id
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Segment` object.)
             * </em>
             */
        R.segments.create = function() {
          var TargetResource = $injector.get("Segment");
          var action = TargetResource["::create::POI::segments"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.POI.segments#createMany
             * @methodOf lbServices.POI.segments
             *
             * @description
             *
             * Creates a new instance in segments of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - POI id
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Segment` object.)
             * </em>
             */
        R.segments.createMany = function() {
          var TargetResource = $injector.get("Segment");
          var action = TargetResource["::createMany::POI::segments"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.POI.segments#destroyAll
             * @methodOf lbServices.POI.segments
             *
             * @description
             *
             * Deletes all segments of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - POI id
             *
             *  - `options` – `{object=}` -
             *
             *  - `where` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.segments.destroyAll = function() {
          var TargetResource = $injector.get("Segment");
          var action = TargetResource["::delete::POI::segments"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.POI.segments#destroyById
             * @methodOf lbServices.POI.segments
             *
             * @description
             *
             * Delete a related item by id for segments.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - POI id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for segments
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.segments.destroyById = function() {
          var TargetResource = $injector.get("Segment");
          var action = TargetResource["::destroyById::POI::segments"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.POI.segments#exists
             * @methodOf lbServices.POI.segments
             *
             * @description
             *
             * Check the existence of segments relation to an item by id.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - POI id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for segments
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Segment` object.)
             * </em>
             */
        R.segments.exists = function() {
          var TargetResource = $injector.get("Segment");
          var action = TargetResource["::exists::POI::segments"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.POI.segments#findById
             * @methodOf lbServices.POI.segments
             *
             * @description
             *
             * Find a related item by id for segments.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - POI id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for segments
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Segment` object.)
             * </em>
             */
        R.segments.findById = function() {
          var TargetResource = $injector.get("Segment");
          var action = TargetResource["::findById::POI::segments"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.POI.segments#link
             * @methodOf lbServices.POI.segments
             *
             * @description
             *
             * Add a related item by id for segments.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - POI id
             *
             *  - `fk` – `{*}` - Foreign key for segments
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Segment` object.)
             * </em>
             */
        R.segments.link = function() {
          var TargetResource = $injector.get("Segment");
          var action = TargetResource["::link::POI::segments"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.POI.segments#unlink
             * @methodOf lbServices.POI.segments
             *
             * @description
             *
             * Remove the segments relation to an item by id.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - POI id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for segments
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.segments.unlink = function() {
          var TargetResource = $injector.get("Segment");
          var action = TargetResource["::unlink::POI::segments"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.POI.segments#updateById
             * @methodOf lbServices.POI.segments
             *
             * @description
             *
             * Update a related item by id for segments.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - POI id
             *
             *  - `fk` – `{*}` - Foreign key for segments
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Segment` object.)
             * </em>
             */
        R.segments.updateById = function() {
          var TargetResource = $injector.get("Segment");
          var action = TargetResource["::updateById::POI::segments"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.POI.pictures
     * @header lbServices.POI.pictures
     * @object
     * @description
     *
     * The object `POI.pictures` groups methods
     * manipulating `Picture` instances related to `POI`.
     *
     * Call {@link lbServices.POI#pictures POI.pictures()}
     * to query all related instances.
     */


            /**
             * @ngdoc method
             * @name lbServices.POI#pictures
             * @methodOf lbServices.POI
             *
             * @description
             *
             * Queries pictures of POI.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - POI id
             *
             *  - `options` – `{object=}` -
             *
             *  - `filter` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Picture` object.)
             * </em>
             */
        R.pictures = function() {
          var TargetResource = $injector.get("Picture");
          var action = TargetResource["::get::POI::pictures"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.POI.pictures#count
             * @methodOf lbServices.POI.pictures
             *
             * @description
             *
             * Counts pictures of POI.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - POI id
             *
             *  - `options` – `{object=}` -
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
        R.pictures.count = function() {
          var TargetResource = $injector.get("Picture");
          var action = TargetResource["::count::POI::pictures"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.POI.pictures#create
             * @methodOf lbServices.POI.pictures
             *
             * @description
             *
             * Creates a new instance in pictures of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - POI id
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Picture` object.)
             * </em>
             */
        R.pictures.create = function() {
          var TargetResource = $injector.get("Picture");
          var action = TargetResource["::create::POI::pictures"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.POI.pictures#createMany
             * @methodOf lbServices.POI.pictures
             *
             * @description
             *
             * Creates a new instance in pictures of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - POI id
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Picture` object.)
             * </em>
             */
        R.pictures.createMany = function() {
          var TargetResource = $injector.get("Picture");
          var action = TargetResource["::createMany::POI::pictures"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.POI.pictures#destroyAll
             * @methodOf lbServices.POI.pictures
             *
             * @description
             *
             * Deletes all pictures of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - POI id
             *
             *  - `options` – `{object=}` -
             *
             *  - `where` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.pictures.destroyAll = function() {
          var TargetResource = $injector.get("Picture");
          var action = TargetResource["::delete::POI::pictures"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.POI.pictures#destroyById
             * @methodOf lbServices.POI.pictures
             *
             * @description
             *
             * Delete a related item by id for pictures.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - POI id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for pictures
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.pictures.destroyById = function() {
          var TargetResource = $injector.get("Picture");
          var action = TargetResource["::destroyById::POI::pictures"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.POI.pictures#exists
             * @methodOf lbServices.POI.pictures
             *
             * @description
             *
             * Check the existence of pictures relation to an item by id.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - POI id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for pictures
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Picture` object.)
             * </em>
             */
        R.pictures.exists = function() {
          var TargetResource = $injector.get("Picture");
          var action = TargetResource["::exists::POI::pictures"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.POI.pictures#findById
             * @methodOf lbServices.POI.pictures
             *
             * @description
             *
             * Find a related item by id for pictures.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - POI id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for pictures
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Picture` object.)
             * </em>
             */
        R.pictures.findById = function() {
          var TargetResource = $injector.get("Picture");
          var action = TargetResource["::findById::POI::pictures"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.POI.pictures#link
             * @methodOf lbServices.POI.pictures
             *
             * @description
             *
             * Add a related item by id for pictures.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - POI id
             *
             *  - `fk` – `{*}` - Foreign key for pictures
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Picture` object.)
             * </em>
             */
        R.pictures.link = function() {
          var TargetResource = $injector.get("Picture");
          var action = TargetResource["::link::POI::pictures"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.POI.pictures#unlink
             * @methodOf lbServices.POI.pictures
             *
             * @description
             *
             * Remove the pictures relation to an item by id.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - POI id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for pictures
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.pictures.unlink = function() {
          var TargetResource = $injector.get("Picture");
          var action = TargetResource["::unlink::POI::pictures"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.POI.pictures#updateById
             * @methodOf lbServices.POI.pictures
             *
             * @description
             *
             * Update a related item by id for pictures.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - POI id
             *
             *  - `fk` – `{*}` - Foreign key for pictures
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Picture` object.)
             * </em>
             */
        R.pictures.updateById = function() {
          var TargetResource = $injector.get("Picture");
          var action = TargetResource["::updateById::POI::pictures"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.POI#user
             * @methodOf lbServices.POI
             *
             * @description
             *
             * Fetches belongsTo relation user.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - POI id
             *
             *  - `options` – `{object=}` -
             *
             *  - `refresh` – `{boolean=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
        R.user = function() {
          var TargetResource = $injector.get("User");
          var action = TargetResource["::get::POI::user"];
          return action.apply(R, arguments);
        };


        return R;
      }]);

/**
 * @ngdoc object
 * @name lbServices.Tag
 * @header lbServices.Tag
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Tag` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
  module.factory(
    "Tag",
    [
      'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
      function(LoopBackResource, LoopBackAuth, $injector, $q) {
        var R = LoopBackResource(
        urlBase + "/Tags/:id",
          { 'id': '@id' },
          {

            // INTERNAL. Use Tag.segmentTags.findById() instead.
            "prototype$__findById__segmentTags": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Tags/:id/segmentTags/:fk",
              method: "GET",
            },

            // INTERNAL. Use Tag.segmentTags.destroyById() instead.
            "prototype$__destroyById__segmentTags": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Tags/:id/segmentTags/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Tag.segmentTags.updateById() instead.
            "prototype$__updateById__segmentTags": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Tags/:id/segmentTags/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Tag.segments.findById() instead.
            "prototype$__findById__segments": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Tags/:id/segments/:fk",
              method: "GET",
            },

            // INTERNAL. Use Tag.segments.destroyById() instead.
            "prototype$__destroyById__segments": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Tags/:id/segments/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Tag.segments.updateById() instead.
            "prototype$__updateById__segments": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Tags/:id/segments/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Tag.segments.link() instead.
            "prototype$__link__segments": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Tags/:id/segments/rel/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Tag.segments.unlink() instead.
            "prototype$__unlink__segments": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Tags/:id/segments/rel/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Tag.segments.exists() instead.
            "prototype$__exists__segments": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Tags/:id/segments/rel/:fk",
              method: "HEAD",
            },

            // INTERNAL. Use Tag.pictureTags.findById() instead.
            "prototype$__findById__pictureTags": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Tags/:id/pictureTags/:fk",
              method: "GET",
            },

            // INTERNAL. Use Tag.pictureTags.destroyById() instead.
            "prototype$__destroyById__pictureTags": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Tags/:id/pictureTags/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Tag.pictureTags.updateById() instead.
            "prototype$__updateById__pictureTags": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Tags/:id/pictureTags/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Tag.pictures.findById() instead.
            "prototype$__findById__pictures": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Tags/:id/pictures/:fk",
              method: "GET",
            },

            // INTERNAL. Use Tag.pictures.destroyById() instead.
            "prototype$__destroyById__pictures": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Tags/:id/pictures/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Tag.pictures.updateById() instead.
            "prototype$__updateById__pictures": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Tags/:id/pictures/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Tag.pictures.link() instead.
            "prototype$__link__pictures": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Tags/:id/pictures/rel/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Tag.pictures.unlink() instead.
            "prototype$__unlink__pictures": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Tags/:id/pictures/rel/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Tag.pictures.exists() instead.
            "prototype$__exists__pictures": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Tags/:id/pictures/rel/:fk",
              method: "HEAD",
            },

            // INTERNAL. Use Tag.segmentTags() instead.
            "prototype$__get__segmentTags": {
              isArray: true,
              url: urlBase + "/Tags/:id/segmentTags",
              method: "GET",
            },

            // INTERNAL. Use Tag.segmentTags.create() instead.
            "prototype$__create__segmentTags": {
              url: urlBase + "/Tags/:id/segmentTags",
              method: "POST",
            },

            // INTERNAL. Use Tag.segmentTags.destroyAll() instead.
            "prototype$__delete__segmentTags": {
              url: urlBase + "/Tags/:id/segmentTags",
              method: "DELETE",
            },

            // INTERNAL. Use Tag.segmentTags.count() instead.
            "prototype$__count__segmentTags": {
              url: urlBase + "/Tags/:id/segmentTags/count",
              method: "GET",
            },

            // INTERNAL. Use Tag.segments() instead.
            "prototype$__get__segments": {
              isArray: true,
              url: urlBase + "/Tags/:id/segments",
              method: "GET",
            },

            // INTERNAL. Use Tag.segments.create() instead.
            "prototype$__create__segments": {
              url: urlBase + "/Tags/:id/segments",
              method: "POST",
            },

            // INTERNAL. Use Tag.segments.destroyAll() instead.
            "prototype$__delete__segments": {
              url: urlBase + "/Tags/:id/segments",
              method: "DELETE",
            },

            // INTERNAL. Use Tag.segments.count() instead.
            "prototype$__count__segments": {
              url: urlBase + "/Tags/:id/segments/count",
              method: "GET",
            },

            // INTERNAL. Use Tag.pictureTags() instead.
            "prototype$__get__pictureTags": {
              isArray: true,
              url: urlBase + "/Tags/:id/pictureTags",
              method: "GET",
            },

            // INTERNAL. Use Tag.pictureTags.create() instead.
            "prototype$__create__pictureTags": {
              url: urlBase + "/Tags/:id/pictureTags",
              method: "POST",
            },

            // INTERNAL. Use Tag.pictureTags.destroyAll() instead.
            "prototype$__delete__pictureTags": {
              url: urlBase + "/Tags/:id/pictureTags",
              method: "DELETE",
            },

            // INTERNAL. Use Tag.pictureTags.count() instead.
            "prototype$__count__pictureTags": {
              url: urlBase + "/Tags/:id/pictureTags/count",
              method: "GET",
            },

            // INTERNAL. Use Tag.pictures() instead.
            "prototype$__get__pictures": {
              isArray: true,
              url: urlBase + "/Tags/:id/pictures",
              method: "GET",
            },

            // INTERNAL. Use Tag.pictures.create() instead.
            "prototype$__create__pictures": {
              url: urlBase + "/Tags/:id/pictures",
              method: "POST",
            },

            // INTERNAL. Use Tag.pictures.destroyAll() instead.
            "prototype$__delete__pictures": {
              url: urlBase + "/Tags/:id/pictures",
              method: "DELETE",
            },

            // INTERNAL. Use Tag.pictures.count() instead.
            "prototype$__count__pictures": {
              url: urlBase + "/Tags/:id/pictures/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Tag#create
             * @methodOf lbServices.Tag
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Tag` object.)
             * </em>
             */
            "create": {
              url: urlBase + "/Tags",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Tag#createMany
             * @methodOf lbServices.Tag
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Tag` object.)
             * </em>
             */
            "createMany": {
              isArray: true,
              url: urlBase + "/Tags",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Tag#patchOrCreate
             * @methodOf lbServices.Tag
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Tag` object.)
             * </em>
             */
            "patchOrCreate": {
              url: urlBase + "/Tags",
              method: "PATCH",
            },

            /**
             * @ngdoc method
             * @name lbServices.Tag#replaceOrCreate
             * @methodOf lbServices.Tag
             *
             * @description
             *
             * Replace an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Tag` object.)
             * </em>
             */
            "replaceOrCreate": {
              url: urlBase + "/Tags/replaceOrCreate",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Tag#upsertWithWhere
             * @methodOf lbServices.Tag
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source based on the where criteria.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Tag` object.)
             * </em>
             */
            "upsertWithWhere": {
              url: urlBase + "/Tags/upsertWithWhere",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Tag#exists
             * @methodOf lbServices.Tag
             *
             * @description
             *
             * Check whether a model instance exists in the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `exists` – `{boolean=}` -
             */
            "exists": {
              url: urlBase + "/Tags/:id/exists",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Tag#findById
             * @methodOf lbServices.Tag
             *
             * @description
             *
             * Find a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `filter` – `{object=}` - Filter defining fields and include - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Tag` object.)
             * </em>
             */
            "findById": {
              url: urlBase + "/Tags/:id",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Tag#replaceById
             * @methodOf lbServices.Tag
             *
             * @description
             *
             * Replace attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Tag` object.)
             * </em>
             */
            "replaceById": {
              url: urlBase + "/Tags/:id/replace",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Tag#find
             * @methodOf lbServices.Tag
             *
             * @description
             *
             * Find all instances of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Tag` object.)
             * </em>
             */
            "find": {
              isArray: true,
              url: urlBase + "/Tags",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Tag#findOne
             * @methodOf lbServices.Tag
             *
             * @description
             *
             * Find first instance of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Tag` object.)
             * </em>
             */
            "findOne": {
              url: urlBase + "/Tags/findOne",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Tag#updateAll
             * @methodOf lbServices.Tag
             *
             * @description
             *
             * Update instances of the model matched by {{where}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Information related to the outcome of the operation
             */
            "updateAll": {
              url: urlBase + "/Tags/update",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Tag#deleteById
             * @methodOf lbServices.Tag
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Tag` object.)
             * </em>
             */
            "deleteById": {
              url: urlBase + "/Tags/:id",
              method: "DELETE",
            },

            /**
             * @ngdoc method
             * @name lbServices.Tag#count
             * @methodOf lbServices.Tag
             *
             * @description
             *
             * Count instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
            "count": {
              url: urlBase + "/Tags/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Tag#prototype$patchAttributes
             * @methodOf lbServices.Tag
             *
             * @description
             *
             * Patch attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Tag id
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Tag` object.)
             * </em>
             */
            "prototype$patchAttributes": {
              url: urlBase + "/Tags/:id",
              method: "PATCH",
            },

            /**
             * @ngdoc method
             * @name lbServices.Tag#createChangeStream
             * @methodOf lbServices.Tag
             *
             * @description
             *
             * Create a change stream.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `changes` – `{ReadableStream=}` -
             */
            "createChangeStream": {
              url: urlBase + "/Tags/change-stream",
              method: "POST",
            },

            // INTERNAL. Use Picture.tags.link() instead.
            "::link::Picture::tags": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Pictures/:id/tags/rel/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Picture.tags.unlink() instead.
            "::unlink::Picture::tags": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Pictures/:id/tags/rel/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Picture.tags.exists() instead.
            "::exists::Picture::tags": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Pictures/:id/tags/rel/:fk",
              method: "HEAD",
            },

            // INTERNAL. Use Picture.tags() instead.
            "::get::Picture::tags": {
              isArray: true,
              url: urlBase + "/Pictures/:id/tags",
              method: "GET",
            },

            // INTERNAL. Use Segment.tags.link() instead.
            "::link::Segment::tags": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Segments/:id/tags/rel/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Segment.tags.unlink() instead.
            "::unlink::Segment::tags": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Segments/:id/tags/rel/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Segment.tags.exists() instead.
            "::exists::Segment::tags": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Segments/:id/tags/rel/:fk",
              method: "HEAD",
            },

            // INTERNAL. Use Segment.tags() instead.
            "::get::Segment::tags": {
              isArray: true,
              url: urlBase + "/Segments/:id/tags",
              method: "GET",
            },

            // INTERNAL. Use PictureTag.tag() instead.
            "::get::PictureTag::tag": {
              url: urlBase + "/PictureTags/:id/tag",
              method: "GET",
            },
          }
        );



            /**
             * @ngdoc method
             * @name lbServices.Tag#upsert
             * @methodOf lbServices.Tag
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Tag` object.)
             * </em>
             */
        R["upsert"] = R["patchOrCreate"];

            /**
             * @ngdoc method
             * @name lbServices.Tag#updateOrCreate
             * @methodOf lbServices.Tag
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Tag` object.)
             * </em>
             */
        R["updateOrCreate"] = R["patchOrCreate"];

            /**
             * @ngdoc method
             * @name lbServices.Tag#patchOrCreateWithWhere
             * @methodOf lbServices.Tag
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source based on the where criteria.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Tag` object.)
             * </em>
             */
        R["patchOrCreateWithWhere"] = R["upsertWithWhere"];

            /**
             * @ngdoc method
             * @name lbServices.Tag#update
             * @methodOf lbServices.Tag
             *
             * @description
             *
             * Update instances of the model matched by {{where}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Information related to the outcome of the operation
             */
        R["update"] = R["updateAll"];

            /**
             * @ngdoc method
             * @name lbServices.Tag#destroyById
             * @methodOf lbServices.Tag
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Tag` object.)
             * </em>
             */
        R["destroyById"] = R["deleteById"];

            /**
             * @ngdoc method
             * @name lbServices.Tag#removeById
             * @methodOf lbServices.Tag
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Tag` object.)
             * </em>
             */
        R["removeById"] = R["deleteById"];

            /**
             * @ngdoc method
             * @name lbServices.Tag#updateAttributes
             * @methodOf lbServices.Tag
             *
             * @description
             *
             * Patch attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Tag id
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Tag` object.)
             * </em>
             */
        R["updateAttributes"] = R["prototype$patchAttributes"];


        /**
        * @ngdoc property
        * @name lbServices.Tag#modelName
        * @propertyOf lbServices.Tag
        * @description
        * The name of the model represented by this $resource,
        * i.e. `Tag`.
        */
        R.modelName = "Tag";

    /**
     * @ngdoc object
     * @name lbServices.Tag.segmentTags
     * @header lbServices.Tag.segmentTags
     * @object
     * @description
     *
     * The object `Tag.segmentTags` groups methods
     * manipulating `SegmentTag` instances related to `Tag`.
     *
     * Call {@link lbServices.Tag#segmentTags Tag.segmentTags()}
     * to query all related instances.
     */


            /**
             * @ngdoc method
             * @name lbServices.Tag#segmentTags
             * @methodOf lbServices.Tag
             *
             * @description
             *
             * Queries segmentTags of Tag.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Tag id
             *
             *  - `options` – `{object=}` -
             *
             *  - `filter` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `SegmentTag` object.)
             * </em>
             */
        R.segmentTags = function() {
          var TargetResource = $injector.get("SegmentTag");
          var action = TargetResource["::get::Tag::segmentTags"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Tag.segmentTags#count
             * @methodOf lbServices.Tag.segmentTags
             *
             * @description
             *
             * Counts segmentTags of Tag.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Tag id
             *
             *  - `options` – `{object=}` -
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
        R.segmentTags.count = function() {
          var TargetResource = $injector.get("SegmentTag");
          var action = TargetResource["::count::Tag::segmentTags"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Tag.segmentTags#create
             * @methodOf lbServices.Tag.segmentTags
             *
             * @description
             *
             * Creates a new instance in segmentTags of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Tag id
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `SegmentTag` object.)
             * </em>
             */
        R.segmentTags.create = function() {
          var TargetResource = $injector.get("SegmentTag");
          var action = TargetResource["::create::Tag::segmentTags"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Tag.segmentTags#createMany
             * @methodOf lbServices.Tag.segmentTags
             *
             * @description
             *
             * Creates a new instance in segmentTags of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Tag id
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `SegmentTag` object.)
             * </em>
             */
        R.segmentTags.createMany = function() {
          var TargetResource = $injector.get("SegmentTag");
          var action = TargetResource["::createMany::Tag::segmentTags"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Tag.segmentTags#destroyAll
             * @methodOf lbServices.Tag.segmentTags
             *
             * @description
             *
             * Deletes all segmentTags of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Tag id
             *
             *  - `options` – `{object=}` -
             *
             *  - `where` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.segmentTags.destroyAll = function() {
          var TargetResource = $injector.get("SegmentTag");
          var action = TargetResource["::delete::Tag::segmentTags"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Tag.segmentTags#destroyById
             * @methodOf lbServices.Tag.segmentTags
             *
             * @description
             *
             * Delete a related item by id for segmentTags.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Tag id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for segmentTags
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.segmentTags.destroyById = function() {
          var TargetResource = $injector.get("SegmentTag");
          var action = TargetResource["::destroyById::Tag::segmentTags"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Tag.segmentTags#findById
             * @methodOf lbServices.Tag.segmentTags
             *
             * @description
             *
             * Find a related item by id for segmentTags.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Tag id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for segmentTags
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `SegmentTag` object.)
             * </em>
             */
        R.segmentTags.findById = function() {
          var TargetResource = $injector.get("SegmentTag");
          var action = TargetResource["::findById::Tag::segmentTags"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Tag.segmentTags#updateById
             * @methodOf lbServices.Tag.segmentTags
             *
             * @description
             *
             * Update a related item by id for segmentTags.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Tag id
             *
             *  - `fk` – `{*}` - Foreign key for segmentTags
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `SegmentTag` object.)
             * </em>
             */
        R.segmentTags.updateById = function() {
          var TargetResource = $injector.get("SegmentTag");
          var action = TargetResource["::updateById::Tag::segmentTags"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Tag.segments
     * @header lbServices.Tag.segments
     * @object
     * @description
     *
     * The object `Tag.segments` groups methods
     * manipulating `Segment` instances related to `Tag`.
     *
     * Call {@link lbServices.Tag#segments Tag.segments()}
     * to query all related instances.
     */


            /**
             * @ngdoc method
             * @name lbServices.Tag#segments
             * @methodOf lbServices.Tag
             *
             * @description
             *
             * Queries segments of Tag.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Tag id
             *
             *  - `options` – `{object=}` -
             *
             *  - `filter` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Segment` object.)
             * </em>
             */
        R.segments = function() {
          var TargetResource = $injector.get("Segment");
          var action = TargetResource["::get::Tag::segments"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Tag.segments#count
             * @methodOf lbServices.Tag.segments
             *
             * @description
             *
             * Counts segments of Tag.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Tag id
             *
             *  - `options` – `{object=}` -
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
        R.segments.count = function() {
          var TargetResource = $injector.get("Segment");
          var action = TargetResource["::count::Tag::segments"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Tag.segments#create
             * @methodOf lbServices.Tag.segments
             *
             * @description
             *
             * Creates a new instance in segments of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Tag id
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Segment` object.)
             * </em>
             */
        R.segments.create = function() {
          var TargetResource = $injector.get("Segment");
          var action = TargetResource["::create::Tag::segments"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Tag.segments#createMany
             * @methodOf lbServices.Tag.segments
             *
             * @description
             *
             * Creates a new instance in segments of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Tag id
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Segment` object.)
             * </em>
             */
        R.segments.createMany = function() {
          var TargetResource = $injector.get("Segment");
          var action = TargetResource["::createMany::Tag::segments"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Tag.segments#destroyAll
             * @methodOf lbServices.Tag.segments
             *
             * @description
             *
             * Deletes all segments of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Tag id
             *
             *  - `options` – `{object=}` -
             *
             *  - `where` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.segments.destroyAll = function() {
          var TargetResource = $injector.get("Segment");
          var action = TargetResource["::delete::Tag::segments"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Tag.segments#destroyById
             * @methodOf lbServices.Tag.segments
             *
             * @description
             *
             * Delete a related item by id for segments.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Tag id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for segments
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.segments.destroyById = function() {
          var TargetResource = $injector.get("Segment");
          var action = TargetResource["::destroyById::Tag::segments"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Tag.segments#exists
             * @methodOf lbServices.Tag.segments
             *
             * @description
             *
             * Check the existence of segments relation to an item by id.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Tag id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for segments
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Segment` object.)
             * </em>
             */
        R.segments.exists = function() {
          var TargetResource = $injector.get("Segment");
          var action = TargetResource["::exists::Tag::segments"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Tag.segments#findById
             * @methodOf lbServices.Tag.segments
             *
             * @description
             *
             * Find a related item by id for segments.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Tag id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for segments
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Segment` object.)
             * </em>
             */
        R.segments.findById = function() {
          var TargetResource = $injector.get("Segment");
          var action = TargetResource["::findById::Tag::segments"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Tag.segments#link
             * @methodOf lbServices.Tag.segments
             *
             * @description
             *
             * Add a related item by id for segments.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Tag id
             *
             *  - `fk` – `{*}` - Foreign key for segments
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Segment` object.)
             * </em>
             */
        R.segments.link = function() {
          var TargetResource = $injector.get("Segment");
          var action = TargetResource["::link::Tag::segments"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Tag.segments#unlink
             * @methodOf lbServices.Tag.segments
             *
             * @description
             *
             * Remove the segments relation to an item by id.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Tag id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for segments
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.segments.unlink = function() {
          var TargetResource = $injector.get("Segment");
          var action = TargetResource["::unlink::Tag::segments"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Tag.segments#updateById
             * @methodOf lbServices.Tag.segments
             *
             * @description
             *
             * Update a related item by id for segments.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Tag id
             *
             *  - `fk` – `{*}` - Foreign key for segments
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Segment` object.)
             * </em>
             */
        R.segments.updateById = function() {
          var TargetResource = $injector.get("Segment");
          var action = TargetResource["::updateById::Tag::segments"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Tag.pictureTags
     * @header lbServices.Tag.pictureTags
     * @object
     * @description
     *
     * The object `Tag.pictureTags` groups methods
     * manipulating `PictureTag` instances related to `Tag`.
     *
     * Call {@link lbServices.Tag#pictureTags Tag.pictureTags()}
     * to query all related instances.
     */


            /**
             * @ngdoc method
             * @name lbServices.Tag#pictureTags
             * @methodOf lbServices.Tag
             *
             * @description
             *
             * Queries pictureTags of Tag.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Tag id
             *
             *  - `options` – `{object=}` -
             *
             *  - `filter` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `PictureTag` object.)
             * </em>
             */
        R.pictureTags = function() {
          var TargetResource = $injector.get("PictureTag");
          var action = TargetResource["::get::Tag::pictureTags"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Tag.pictureTags#count
             * @methodOf lbServices.Tag.pictureTags
             *
             * @description
             *
             * Counts pictureTags of Tag.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Tag id
             *
             *  - `options` – `{object=}` -
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
        R.pictureTags.count = function() {
          var TargetResource = $injector.get("PictureTag");
          var action = TargetResource["::count::Tag::pictureTags"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Tag.pictureTags#create
             * @methodOf lbServices.Tag.pictureTags
             *
             * @description
             *
             * Creates a new instance in pictureTags of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Tag id
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `PictureTag` object.)
             * </em>
             */
        R.pictureTags.create = function() {
          var TargetResource = $injector.get("PictureTag");
          var action = TargetResource["::create::Tag::pictureTags"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Tag.pictureTags#createMany
             * @methodOf lbServices.Tag.pictureTags
             *
             * @description
             *
             * Creates a new instance in pictureTags of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Tag id
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `PictureTag` object.)
             * </em>
             */
        R.pictureTags.createMany = function() {
          var TargetResource = $injector.get("PictureTag");
          var action = TargetResource["::createMany::Tag::pictureTags"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Tag.pictureTags#destroyAll
             * @methodOf lbServices.Tag.pictureTags
             *
             * @description
             *
             * Deletes all pictureTags of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Tag id
             *
             *  - `options` – `{object=}` -
             *
             *  - `where` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.pictureTags.destroyAll = function() {
          var TargetResource = $injector.get("PictureTag");
          var action = TargetResource["::delete::Tag::pictureTags"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Tag.pictureTags#destroyById
             * @methodOf lbServices.Tag.pictureTags
             *
             * @description
             *
             * Delete a related item by id for pictureTags.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Tag id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for pictureTags
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.pictureTags.destroyById = function() {
          var TargetResource = $injector.get("PictureTag");
          var action = TargetResource["::destroyById::Tag::pictureTags"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Tag.pictureTags#findById
             * @methodOf lbServices.Tag.pictureTags
             *
             * @description
             *
             * Find a related item by id for pictureTags.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Tag id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for pictureTags
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `PictureTag` object.)
             * </em>
             */
        R.pictureTags.findById = function() {
          var TargetResource = $injector.get("PictureTag");
          var action = TargetResource["::findById::Tag::pictureTags"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Tag.pictureTags#updateById
             * @methodOf lbServices.Tag.pictureTags
             *
             * @description
             *
             * Update a related item by id for pictureTags.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Tag id
             *
             *  - `fk` – `{*}` - Foreign key for pictureTags
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `PictureTag` object.)
             * </em>
             */
        R.pictureTags.updateById = function() {
          var TargetResource = $injector.get("PictureTag");
          var action = TargetResource["::updateById::Tag::pictureTags"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Tag.pictures
     * @header lbServices.Tag.pictures
     * @object
     * @description
     *
     * The object `Tag.pictures` groups methods
     * manipulating `Picture` instances related to `Tag`.
     *
     * Call {@link lbServices.Tag#pictures Tag.pictures()}
     * to query all related instances.
     */


            /**
             * @ngdoc method
             * @name lbServices.Tag#pictures
             * @methodOf lbServices.Tag
             *
             * @description
             *
             * Queries pictures of Tag.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Tag id
             *
             *  - `options` – `{object=}` -
             *
             *  - `filter` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Picture` object.)
             * </em>
             */
        R.pictures = function() {
          var TargetResource = $injector.get("Picture");
          var action = TargetResource["::get::Tag::pictures"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Tag.pictures#count
             * @methodOf lbServices.Tag.pictures
             *
             * @description
             *
             * Counts pictures of Tag.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Tag id
             *
             *  - `options` – `{object=}` -
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
        R.pictures.count = function() {
          var TargetResource = $injector.get("Picture");
          var action = TargetResource["::count::Tag::pictures"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Tag.pictures#create
             * @methodOf lbServices.Tag.pictures
             *
             * @description
             *
             * Creates a new instance in pictures of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Tag id
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Picture` object.)
             * </em>
             */
        R.pictures.create = function() {
          var TargetResource = $injector.get("Picture");
          var action = TargetResource["::create::Tag::pictures"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Tag.pictures#createMany
             * @methodOf lbServices.Tag.pictures
             *
             * @description
             *
             * Creates a new instance in pictures of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Tag id
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Picture` object.)
             * </em>
             */
        R.pictures.createMany = function() {
          var TargetResource = $injector.get("Picture");
          var action = TargetResource["::createMany::Tag::pictures"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Tag.pictures#destroyAll
             * @methodOf lbServices.Tag.pictures
             *
             * @description
             *
             * Deletes all pictures of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Tag id
             *
             *  - `options` – `{object=}` -
             *
             *  - `where` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.pictures.destroyAll = function() {
          var TargetResource = $injector.get("Picture");
          var action = TargetResource["::delete::Tag::pictures"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Tag.pictures#destroyById
             * @methodOf lbServices.Tag.pictures
             *
             * @description
             *
             * Delete a related item by id for pictures.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Tag id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for pictures
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.pictures.destroyById = function() {
          var TargetResource = $injector.get("Picture");
          var action = TargetResource["::destroyById::Tag::pictures"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Tag.pictures#exists
             * @methodOf lbServices.Tag.pictures
             *
             * @description
             *
             * Check the existence of pictures relation to an item by id.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Tag id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for pictures
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Picture` object.)
             * </em>
             */
        R.pictures.exists = function() {
          var TargetResource = $injector.get("Picture");
          var action = TargetResource["::exists::Tag::pictures"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Tag.pictures#findById
             * @methodOf lbServices.Tag.pictures
             *
             * @description
             *
             * Find a related item by id for pictures.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Tag id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for pictures
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Picture` object.)
             * </em>
             */
        R.pictures.findById = function() {
          var TargetResource = $injector.get("Picture");
          var action = TargetResource["::findById::Tag::pictures"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Tag.pictures#link
             * @methodOf lbServices.Tag.pictures
             *
             * @description
             *
             * Add a related item by id for pictures.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Tag id
             *
             *  - `fk` – `{*}` - Foreign key for pictures
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Picture` object.)
             * </em>
             */
        R.pictures.link = function() {
          var TargetResource = $injector.get("Picture");
          var action = TargetResource["::link::Tag::pictures"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Tag.pictures#unlink
             * @methodOf lbServices.Tag.pictures
             *
             * @description
             *
             * Remove the pictures relation to an item by id.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Tag id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for pictures
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.pictures.unlink = function() {
          var TargetResource = $injector.get("Picture");
          var action = TargetResource["::unlink::Tag::pictures"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Tag.pictures#updateById
             * @methodOf lbServices.Tag.pictures
             *
             * @description
             *
             * Update a related item by id for pictures.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Tag id
             *
             *  - `fk` – `{*}` - Foreign key for pictures
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Picture` object.)
             * </em>
             */
        R.pictures.updateById = function() {
          var TargetResource = $injector.get("Picture");
          var action = TargetResource["::updateById::Tag::pictures"];
          return action.apply(R, arguments);
        };


        return R;
      }]);

/**
 * @ngdoc object
 * @name lbServices.Comment
 * @header lbServices.Comment
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Comment` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
  module.factory(
    "Comment",
    [
      'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
      function(LoopBackResource, LoopBackAuth, $injector, $q) {
        var R = LoopBackResource(
        urlBase + "/Comments/:id",
          { 'id': '@id' },
          {

            // INTERNAL. Use Comment.user() instead.
            "prototype$__get__user": {
              url: urlBase + "/Comments/:id/user",
              method: "GET",
            },

            // INTERNAL. Use Comment.replies.findById() instead.
            "prototype$__findById__replies": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Comments/:id/replies/:fk",
              method: "GET",
            },

            // INTERNAL. Use Comment.replies.destroyById() instead.
            "prototype$__destroyById__replies": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Comments/:id/replies/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Comment.replies.updateById() instead.
            "prototype$__updateById__replies": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Comments/:id/replies/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Comment.replies() instead.
            "prototype$__get__replies": {
              isArray: true,
              url: urlBase + "/Comments/:id/replies",
              method: "GET",
            },

            // INTERNAL. Use Comment.replies.create() instead.
            "prototype$__create__replies": {
              url: urlBase + "/Comments/:id/replies",
              method: "POST",
            },

            // INTERNAL. Use Comment.replies.destroyAll() instead.
            "prototype$__delete__replies": {
              url: urlBase + "/Comments/:id/replies",
              method: "DELETE",
            },

            // INTERNAL. Use Comment.replies.count() instead.
            "prototype$__count__replies": {
              url: urlBase + "/Comments/:id/replies/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Comment#create
             * @methodOf lbServices.Comment
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Comment` object.)
             * </em>
             */
            "create": {
              url: urlBase + "/Comments",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Comment#createMany
             * @methodOf lbServices.Comment
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Comment` object.)
             * </em>
             */
            "createMany": {
              isArray: true,
              url: urlBase + "/Comments",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Comment#patchOrCreate
             * @methodOf lbServices.Comment
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Comment` object.)
             * </em>
             */
            "patchOrCreate": {
              url: urlBase + "/Comments",
              method: "PATCH",
            },

            /**
             * @ngdoc method
             * @name lbServices.Comment#replaceOrCreate
             * @methodOf lbServices.Comment
             *
             * @description
             *
             * Replace an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Comment` object.)
             * </em>
             */
            "replaceOrCreate": {
              url: urlBase + "/Comments/replaceOrCreate",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Comment#upsertWithWhere
             * @methodOf lbServices.Comment
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source based on the where criteria.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Comment` object.)
             * </em>
             */
            "upsertWithWhere": {
              url: urlBase + "/Comments/upsertWithWhere",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Comment#exists
             * @methodOf lbServices.Comment
             *
             * @description
             *
             * Check whether a model instance exists in the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `exists` – `{boolean=}` -
             */
            "exists": {
              url: urlBase + "/Comments/:id/exists",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Comment#findById
             * @methodOf lbServices.Comment
             *
             * @description
             *
             * Find a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `filter` – `{object=}` - Filter defining fields and include - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Comment` object.)
             * </em>
             */
            "findById": {
              url: urlBase + "/Comments/:id",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Comment#replaceById
             * @methodOf lbServices.Comment
             *
             * @description
             *
             * Replace attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Comment` object.)
             * </em>
             */
            "replaceById": {
              url: urlBase + "/Comments/:id/replace",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Comment#find
             * @methodOf lbServices.Comment
             *
             * @description
             *
             * Find all instances of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Comment` object.)
             * </em>
             */
            "find": {
              isArray: true,
              url: urlBase + "/Comments",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Comment#findOne
             * @methodOf lbServices.Comment
             *
             * @description
             *
             * Find first instance of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Comment` object.)
             * </em>
             */
            "findOne": {
              url: urlBase + "/Comments/findOne",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Comment#updateAll
             * @methodOf lbServices.Comment
             *
             * @description
             *
             * Update instances of the model matched by {{where}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Information related to the outcome of the operation
             */
            "updateAll": {
              url: urlBase + "/Comments/update",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Comment#deleteById
             * @methodOf lbServices.Comment
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Comment` object.)
             * </em>
             */
            "deleteById": {
              url: urlBase + "/Comments/:id",
              method: "DELETE",
            },

            /**
             * @ngdoc method
             * @name lbServices.Comment#count
             * @methodOf lbServices.Comment
             *
             * @description
             *
             * Count instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
            "count": {
              url: urlBase + "/Comments/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Comment#prototype$patchAttributes
             * @methodOf lbServices.Comment
             *
             * @description
             *
             * Patch attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Comment id
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Comment` object.)
             * </em>
             */
            "prototype$patchAttributes": {
              url: urlBase + "/Comments/:id",
              method: "PATCH",
            },

            /**
             * @ngdoc method
             * @name lbServices.Comment#createChangeStream
             * @methodOf lbServices.Comment
             *
             * @description
             *
             * Create a change stream.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `changes` – `{ReadableStream=}` -
             */
            "createChangeStream": {
              url: urlBase + "/Comments/change-stream",
              method: "POST",
            },

            // INTERNAL. Use Comment.replies.findById() instead.
            "::findById::Comment::replies": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Comments/:id/replies/:fk",
              method: "GET",
            },

            // INTERNAL. Use Comment.replies.destroyById() instead.
            "::destroyById::Comment::replies": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Comments/:id/replies/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Comment.replies.updateById() instead.
            "::updateById::Comment::replies": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Comments/:id/replies/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Comment.replies() instead.
            "::get::Comment::replies": {
              isArray: true,
              url: urlBase + "/Comments/:id/replies",
              method: "GET",
            },

            // INTERNAL. Use Comment.replies.create() instead.
            "::create::Comment::replies": {
              url: urlBase + "/Comments/:id/replies",
              method: "POST",
            },

            // INTERNAL. Use Comment.replies.createMany() instead.
            "::createMany::Comment::replies": {
              isArray: true,
              url: urlBase + "/Comments/:id/replies",
              method: "POST",
            },

            // INTERNAL. Use Comment.replies.destroyAll() instead.
            "::delete::Comment::replies": {
              url: urlBase + "/Comments/:id/replies",
              method: "DELETE",
            },

            // INTERNAL. Use Comment.replies.count() instead.
            "::count::Comment::replies": {
              url: urlBase + "/Comments/:id/replies/count",
              method: "GET",
            },
          }
        );



            /**
             * @ngdoc method
             * @name lbServices.Comment#upsert
             * @methodOf lbServices.Comment
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Comment` object.)
             * </em>
             */
        R["upsert"] = R["patchOrCreate"];

            /**
             * @ngdoc method
             * @name lbServices.Comment#updateOrCreate
             * @methodOf lbServices.Comment
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Comment` object.)
             * </em>
             */
        R["updateOrCreate"] = R["patchOrCreate"];

            /**
             * @ngdoc method
             * @name lbServices.Comment#patchOrCreateWithWhere
             * @methodOf lbServices.Comment
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source based on the where criteria.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Comment` object.)
             * </em>
             */
        R["patchOrCreateWithWhere"] = R["upsertWithWhere"];

            /**
             * @ngdoc method
             * @name lbServices.Comment#update
             * @methodOf lbServices.Comment
             *
             * @description
             *
             * Update instances of the model matched by {{where}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Information related to the outcome of the operation
             */
        R["update"] = R["updateAll"];

            /**
             * @ngdoc method
             * @name lbServices.Comment#destroyById
             * @methodOf lbServices.Comment
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Comment` object.)
             * </em>
             */
        R["destroyById"] = R["deleteById"];

            /**
             * @ngdoc method
             * @name lbServices.Comment#removeById
             * @methodOf lbServices.Comment
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Comment` object.)
             * </em>
             */
        R["removeById"] = R["deleteById"];

            /**
             * @ngdoc method
             * @name lbServices.Comment#updateAttributes
             * @methodOf lbServices.Comment
             *
             * @description
             *
             * Patch attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Comment id
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Comment` object.)
             * </em>
             */
        R["updateAttributes"] = R["prototype$patchAttributes"];


        /**
        * @ngdoc property
        * @name lbServices.Comment#modelName
        * @propertyOf lbServices.Comment
        * @description
        * The name of the model represented by this $resource,
        * i.e. `Comment`.
        */
        R.modelName = "Comment";


            /**
             * @ngdoc method
             * @name lbServices.Comment#user
             * @methodOf lbServices.Comment
             *
             * @description
             *
             * Fetches belongsTo relation user.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Comment id
             *
             *  - `options` – `{object=}` -
             *
             *  - `refresh` – `{boolean=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
        R.user = function() {
          var TargetResource = $injector.get("User");
          var action = TargetResource["::get::Comment::user"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Comment.replies
     * @header lbServices.Comment.replies
     * @object
     * @description
     *
     * The object `Comment.replies` groups methods
     * manipulating `Comment` instances related to `Comment`.
     *
     * Call {@link lbServices.Comment#replies Comment.replies()}
     * to query all related instances.
     */


            /**
             * @ngdoc method
             * @name lbServices.Comment#replies
             * @methodOf lbServices.Comment
             *
             * @description
             *
             * Queries replies of Comment.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Comment id
             *
             *  - `options` – `{object=}` -
             *
             *  - `filter` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Comment` object.)
             * </em>
             */
        R.replies = function() {
          var TargetResource = $injector.get("Comment");
          var action = TargetResource["::get::Comment::replies"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Comment.replies#count
             * @methodOf lbServices.Comment.replies
             *
             * @description
             *
             * Counts replies of Comment.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Comment id
             *
             *  - `options` – `{object=}` -
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
        R.replies.count = function() {
          var TargetResource = $injector.get("Comment");
          var action = TargetResource["::count::Comment::replies"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Comment.replies#create
             * @methodOf lbServices.Comment.replies
             *
             * @description
             *
             * Creates a new instance in replies of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Comment id
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Comment` object.)
             * </em>
             */
        R.replies.create = function() {
          var TargetResource = $injector.get("Comment");
          var action = TargetResource["::create::Comment::replies"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Comment.replies#createMany
             * @methodOf lbServices.Comment.replies
             *
             * @description
             *
             * Creates a new instance in replies of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Comment id
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Comment` object.)
             * </em>
             */
        R.replies.createMany = function() {
          var TargetResource = $injector.get("Comment");
          var action = TargetResource["::createMany::Comment::replies"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Comment.replies#destroyAll
             * @methodOf lbServices.Comment.replies
             *
             * @description
             *
             * Deletes all replies of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Comment id
             *
             *  - `options` – `{object=}` -
             *
             *  - `where` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.replies.destroyAll = function() {
          var TargetResource = $injector.get("Comment");
          var action = TargetResource["::delete::Comment::replies"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Comment.replies#destroyById
             * @methodOf lbServices.Comment.replies
             *
             * @description
             *
             * Delete a related item by id for replies.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Comment id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for replies
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.replies.destroyById = function() {
          var TargetResource = $injector.get("Comment");
          var action = TargetResource["::destroyById::Comment::replies"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Comment.replies#findById
             * @methodOf lbServices.Comment.replies
             *
             * @description
             *
             * Find a related item by id for replies.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Comment id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for replies
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Comment` object.)
             * </em>
             */
        R.replies.findById = function() {
          var TargetResource = $injector.get("Comment");
          var action = TargetResource["::findById::Comment::replies"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Comment.replies#updateById
             * @methodOf lbServices.Comment.replies
             *
             * @description
             *
             * Update a related item by id for replies.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Comment id
             *
             *  - `fk` – `{*}` - Foreign key for replies
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Comment` object.)
             * </em>
             */
        R.replies.updateById = function() {
          var TargetResource = $injector.get("Comment");
          var action = TargetResource["::updateById::Comment::replies"];
          return action.apply(R, arguments);
        };


        return R;
      }]);

/**
 * @ngdoc object
 * @name lbServices.PointCloud
 * @header lbServices.PointCloud
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `PointCloud` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
  module.factory(
    "PointCloud",
    [
      'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
      function(LoopBackResource, LoopBackAuth, $injector, $q) {
        var R = LoopBackResource(
        urlBase + "/PointClouds/:id",
          { 'id': '@id' },
          {

            /**
             * @ngdoc method
             * @name lbServices.PointCloud#findById
             * @methodOf lbServices.PointCloud
             *
             * @description
             *
             * Find a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `filter` – `{object=}` - Filter defining fields and include - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `PointCloud` object.)
             * </em>
             */
            "findById": {
              url: urlBase + "/PointClouds/:id",
              method: "GET",
            },

            // INTERNAL. Use Pose.pointCloud() instead.
            "::get::Pose::pointCloud": {
              url: urlBase + "/Poses/:id/pointCloud",
              method: "GET",
            },
          }
        );




        /**
        * @ngdoc property
        * @name lbServices.PointCloud#modelName
        * @propertyOf lbServices.PointCloud
        * @description
        * The name of the model represented by this $resource,
        * i.e. `PointCloud`.
        */
        R.modelName = "PointCloud";



        return R;
      }]);

/**
 * @ngdoc object
 * @name lbServices.Like
 * @header lbServices.Like
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Like` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
  module.factory(
    "Like",
    [
      'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
      function(LoopBackResource, LoopBackAuth, $injector, $q) {
        var R = LoopBackResource(
        urlBase + "/Likes/:id",
          { 'id': '@id' },
          {

            /**
             * @ngdoc method
             * @name lbServices.Like#findById
             * @methodOf lbServices.Like
             *
             * @description
             *
             * Find a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `filter` – `{object=}` - Filter defining fields and include - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Like` object.)
             * </em>
             */
            "findById": {
              url: urlBase + "/Likes/:id",
              method: "GET",
            },
          }
        );




        /**
        * @ngdoc property
        * @name lbServices.Like#modelName
        * @propertyOf lbServices.Like
        * @description
        * The name of the model represented by this $resource,
        * i.e. `Like`.
        */
        R.modelName = "Like";



        return R;
      }]);

/**
 * @ngdoc object
 * @name lbServices.Pose
 * @header lbServices.Pose
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Pose` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
  module.factory(
    "Pose",
    [
      'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
      function(LoopBackResource, LoopBackAuth, $injector, $q) {
        var R = LoopBackResource(
        urlBase + "/Poses/:id",
          { 'id': '@id' },
          {

            // INTERNAL. Use Pose.pointCloud() instead.
            "prototype$__get__pointCloud": {
              url: urlBase + "/Poses/:id/pointCloud",
              method: "GET",
            },

            // INTERNAL. Use Pose.picture() instead.
            "prototype$__get__picture": {
              url: urlBase + "/Poses/:id/picture",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Pose#create
             * @methodOf lbServices.Pose
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Pose` object.)
             * </em>
             */
            "create": {
              url: urlBase + "/Poses",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Pose#createMany
             * @methodOf lbServices.Pose
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Pose` object.)
             * </em>
             */
            "createMany": {
              isArray: true,
              url: urlBase + "/Poses",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Pose#patchOrCreate
             * @methodOf lbServices.Pose
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Pose` object.)
             * </em>
             */
            "patchOrCreate": {
              url: urlBase + "/Poses",
              method: "PATCH",
            },

            /**
             * @ngdoc method
             * @name lbServices.Pose#replaceOrCreate
             * @methodOf lbServices.Pose
             *
             * @description
             *
             * Replace an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Pose` object.)
             * </em>
             */
            "replaceOrCreate": {
              url: urlBase + "/Poses/replaceOrCreate",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Pose#upsertWithWhere
             * @methodOf lbServices.Pose
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source based on the where criteria.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Pose` object.)
             * </em>
             */
            "upsertWithWhere": {
              url: urlBase + "/Poses/upsertWithWhere",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Pose#exists
             * @methodOf lbServices.Pose
             *
             * @description
             *
             * Check whether a model instance exists in the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `exists` – `{boolean=}` -
             */
            "exists": {
              url: urlBase + "/Poses/:id/exists",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Pose#findById
             * @methodOf lbServices.Pose
             *
             * @description
             *
             * Find a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `filter` – `{object=}` - Filter defining fields and include - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Pose` object.)
             * </em>
             */
            "findById": {
              url: urlBase + "/Poses/:id",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Pose#replaceById
             * @methodOf lbServices.Pose
             *
             * @description
             *
             * Replace attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Pose` object.)
             * </em>
             */
            "replaceById": {
              url: urlBase + "/Poses/:id/replace",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Pose#find
             * @methodOf lbServices.Pose
             *
             * @description
             *
             * Find all instances of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Pose` object.)
             * </em>
             */
            "find": {
              isArray: true,
              url: urlBase + "/Poses",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Pose#findOne
             * @methodOf lbServices.Pose
             *
             * @description
             *
             * Find first instance of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Pose` object.)
             * </em>
             */
            "findOne": {
              url: urlBase + "/Poses/findOne",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Pose#updateAll
             * @methodOf lbServices.Pose
             *
             * @description
             *
             * Update instances of the model matched by {{where}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Information related to the outcome of the operation
             */
            "updateAll": {
              url: urlBase + "/Poses/update",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Pose#deleteById
             * @methodOf lbServices.Pose
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Pose` object.)
             * </em>
             */
            "deleteById": {
              url: urlBase + "/Poses/:id",
              method: "DELETE",
            },

            /**
             * @ngdoc method
             * @name lbServices.Pose#count
             * @methodOf lbServices.Pose
             *
             * @description
             *
             * Count instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
            "count": {
              url: urlBase + "/Poses/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Pose#prototype$patchAttributes
             * @methodOf lbServices.Pose
             *
             * @description
             *
             * Patch attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Pose id
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Pose` object.)
             * </em>
             */
            "prototype$patchAttributes": {
              url: urlBase + "/Poses/:id",
              method: "PATCH",
            },

            /**
             * @ngdoc method
             * @name lbServices.Pose#createChangeStream
             * @methodOf lbServices.Pose
             *
             * @description
             *
             * Create a change stream.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `changes` – `{ReadableStream=}` -
             */
            "createChangeStream": {
              url: urlBase + "/Poses/change-stream",
              method: "POST",
            },
          }
        );



            /**
             * @ngdoc method
             * @name lbServices.Pose#upsert
             * @methodOf lbServices.Pose
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Pose` object.)
             * </em>
             */
        R["upsert"] = R["patchOrCreate"];

            /**
             * @ngdoc method
             * @name lbServices.Pose#updateOrCreate
             * @methodOf lbServices.Pose
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Pose` object.)
             * </em>
             */
        R["updateOrCreate"] = R["patchOrCreate"];

            /**
             * @ngdoc method
             * @name lbServices.Pose#patchOrCreateWithWhere
             * @methodOf lbServices.Pose
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source based on the where criteria.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Pose` object.)
             * </em>
             */
        R["patchOrCreateWithWhere"] = R["upsertWithWhere"];

            /**
             * @ngdoc method
             * @name lbServices.Pose#update
             * @methodOf lbServices.Pose
             *
             * @description
             *
             * Update instances of the model matched by {{where}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Information related to the outcome of the operation
             */
        R["update"] = R["updateAll"];

            /**
             * @ngdoc method
             * @name lbServices.Pose#destroyById
             * @methodOf lbServices.Pose
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Pose` object.)
             * </em>
             */
        R["destroyById"] = R["deleteById"];

            /**
             * @ngdoc method
             * @name lbServices.Pose#removeById
             * @methodOf lbServices.Pose
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Pose` object.)
             * </em>
             */
        R["removeById"] = R["deleteById"];

            /**
             * @ngdoc method
             * @name lbServices.Pose#updateAttributes
             * @methodOf lbServices.Pose
             *
             * @description
             *
             * Patch attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Pose id
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Pose` object.)
             * </em>
             */
        R["updateAttributes"] = R["prototype$patchAttributes"];


        /**
        * @ngdoc property
        * @name lbServices.Pose#modelName
        * @propertyOf lbServices.Pose
        * @description
        * The name of the model represented by this $resource,
        * i.e. `Pose`.
        */
        R.modelName = "Pose";


            /**
             * @ngdoc method
             * @name lbServices.Pose#pointCloud
             * @methodOf lbServices.Pose
             *
             * @description
             *
             * Fetches belongsTo relation pointCloud.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Pose id
             *
             *  - `options` – `{object=}` -
             *
             *  - `refresh` – `{boolean=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `PointCloud` object.)
             * </em>
             */
        R.pointCloud = function() {
          var TargetResource = $injector.get("PointCloud");
          var action = TargetResource["::get::Pose::pointCloud"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Pose#picture
             * @methodOf lbServices.Pose
             *
             * @description
             *
             * Fetches belongsTo relation picture.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Pose id
             *
             *  - `options` – `{object=}` -
             *
             *  - `refresh` – `{boolean=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Picture` object.)
             * </em>
             */
        R.picture = function() {
          var TargetResource = $injector.get("Picture");
          var action = TargetResource["::get::Pose::picture"];
          return action.apply(R, arguments);
        };


        return R;
      }]);

/**
 * @ngdoc object
 * @name lbServices.SegmentTag
 * @header lbServices.SegmentTag
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `SegmentTag` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
  module.factory(
    "SegmentTag",
    [
      'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
      function(LoopBackResource, LoopBackAuth, $injector, $q) {
        var R = LoopBackResource(
        urlBase + "/SegmentTags/:id",
          { 'id': '@id' },
          {

            /**
             * @ngdoc method
             * @name lbServices.SegmentTag#findById
             * @methodOf lbServices.SegmentTag
             *
             * @description
             *
             * Find a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `filter` – `{object=}` - Filter defining fields and include - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `SegmentTag` object.)
             * </em>
             */
            "findById": {
              url: urlBase + "/SegmentTags/:id",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.SegmentTag#find
             * @methodOf lbServices.SegmentTag
             *
             * @description
             *
             * Find all instances of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `SegmentTag` object.)
             * </em>
             */
            "find": {
              isArray: true,
              url: urlBase + "/SegmentTags",
              method: "GET",
            },

            // INTERNAL. Use Tag.segmentTags.findById() instead.
            "::findById::Tag::segmentTags": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Tags/:id/segmentTags/:fk",
              method: "GET",
            },

            // INTERNAL. Use Tag.segmentTags.destroyById() instead.
            "::destroyById::Tag::segmentTags": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Tags/:id/segmentTags/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Tag.segmentTags.updateById() instead.
            "::updateById::Tag::segmentTags": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Tags/:id/segmentTags/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Tag.segmentTags() instead.
            "::get::Tag::segmentTags": {
              isArray: true,
              url: urlBase + "/Tags/:id/segmentTags",
              method: "GET",
            },

            // INTERNAL. Use Tag.segmentTags.create() instead.
            "::create::Tag::segmentTags": {
              url: urlBase + "/Tags/:id/segmentTags",
              method: "POST",
            },

            // INTERNAL. Use Tag.segmentTags.createMany() instead.
            "::createMany::Tag::segmentTags": {
              isArray: true,
              url: urlBase + "/Tags/:id/segmentTags",
              method: "POST",
            },

            // INTERNAL. Use Tag.segmentTags.destroyAll() instead.
            "::delete::Tag::segmentTags": {
              url: urlBase + "/Tags/:id/segmentTags",
              method: "DELETE",
            },

            // INTERNAL. Use Tag.segmentTags.count() instead.
            "::count::Tag::segmentTags": {
              url: urlBase + "/Tags/:id/segmentTags/count",
              method: "GET",
            },
          }
        );




        /**
        * @ngdoc property
        * @name lbServices.SegmentTag#modelName
        * @propertyOf lbServices.SegmentTag
        * @description
        * The name of the model represented by this $resource,
        * i.e. `SegmentTag`.
        */
        R.modelName = "SegmentTag";



        return R;
      }]);

/**
 * @ngdoc object
 * @name lbServices.PictureTag
 * @header lbServices.PictureTag
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `PictureTag` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
  module.factory(
    "PictureTag",
    [
      'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
      function(LoopBackResource, LoopBackAuth, $injector, $q) {
        var R = LoopBackResource(
        urlBase + "/PictureTags/:id",
          { 'id': '@id' },
          {

            // INTERNAL. Use PictureTag.picture() instead.
            "prototype$__get__picture": {
              url: urlBase + "/PictureTags/:id/picture",
              method: "GET",
            },

            // INTERNAL. Use PictureTag.tag() instead.
            "prototype$__get__tag": {
              url: urlBase + "/PictureTags/:id/tag",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.PictureTag#create
             * @methodOf lbServices.PictureTag
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `PictureTag` object.)
             * </em>
             */
            "create": {
              url: urlBase + "/PictureTags",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.PictureTag#createMany
             * @methodOf lbServices.PictureTag
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `PictureTag` object.)
             * </em>
             */
            "createMany": {
              isArray: true,
              url: urlBase + "/PictureTags",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.PictureTag#patchOrCreate
             * @methodOf lbServices.PictureTag
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `PictureTag` object.)
             * </em>
             */
            "patchOrCreate": {
              url: urlBase + "/PictureTags",
              method: "PATCH",
            },

            /**
             * @ngdoc method
             * @name lbServices.PictureTag#replaceOrCreate
             * @methodOf lbServices.PictureTag
             *
             * @description
             *
             * Replace an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `PictureTag` object.)
             * </em>
             */
            "replaceOrCreate": {
              url: urlBase + "/PictureTags/replaceOrCreate",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.PictureTag#upsertWithWhere
             * @methodOf lbServices.PictureTag
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source based on the where criteria.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `PictureTag` object.)
             * </em>
             */
            "upsertWithWhere": {
              url: urlBase + "/PictureTags/upsertWithWhere",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.PictureTag#exists
             * @methodOf lbServices.PictureTag
             *
             * @description
             *
             * Check whether a model instance exists in the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `exists` – `{boolean=}` -
             */
            "exists": {
              url: urlBase + "/PictureTags/:id/exists",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.PictureTag#findById
             * @methodOf lbServices.PictureTag
             *
             * @description
             *
             * Find a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `filter` – `{object=}` - Filter defining fields and include - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `PictureTag` object.)
             * </em>
             */
            "findById": {
              url: urlBase + "/PictureTags/:id",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.PictureTag#replaceById
             * @methodOf lbServices.PictureTag
             *
             * @description
             *
             * Replace attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `PictureTag` object.)
             * </em>
             */
            "replaceById": {
              url: urlBase + "/PictureTags/:id/replace",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.PictureTag#find
             * @methodOf lbServices.PictureTag
             *
             * @description
             *
             * Find all instances of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `PictureTag` object.)
             * </em>
             */
            "find": {
              isArray: true,
              url: urlBase + "/PictureTags",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.PictureTag#findOne
             * @methodOf lbServices.PictureTag
             *
             * @description
             *
             * Find first instance of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `PictureTag` object.)
             * </em>
             */
            "findOne": {
              url: urlBase + "/PictureTags/findOne",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.PictureTag#updateAll
             * @methodOf lbServices.PictureTag
             *
             * @description
             *
             * Update instances of the model matched by {{where}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Information related to the outcome of the operation
             */
            "updateAll": {
              url: urlBase + "/PictureTags/update",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.PictureTag#deleteById
             * @methodOf lbServices.PictureTag
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `PictureTag` object.)
             * </em>
             */
            "deleteById": {
              url: urlBase + "/PictureTags/:id",
              method: "DELETE",
            },

            /**
             * @ngdoc method
             * @name lbServices.PictureTag#count
             * @methodOf lbServices.PictureTag
             *
             * @description
             *
             * Count instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
            "count": {
              url: urlBase + "/PictureTags/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.PictureTag#prototype$patchAttributes
             * @methodOf lbServices.PictureTag
             *
             * @description
             *
             * Patch attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PictureTag id
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `PictureTag` object.)
             * </em>
             */
            "prototype$patchAttributes": {
              url: urlBase + "/PictureTags/:id",
              method: "PATCH",
            },

            /**
             * @ngdoc method
             * @name lbServices.PictureTag#createChangeStream
             * @methodOf lbServices.PictureTag
             *
             * @description
             *
             * Create a change stream.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `changes` – `{ReadableStream=}` -
             */
            "createChangeStream": {
              url: urlBase + "/PictureTags/change-stream",
              method: "POST",
            },

            // INTERNAL. Use Tag.pictureTags.findById() instead.
            "::findById::Tag::pictureTags": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Tags/:id/pictureTags/:fk",
              method: "GET",
            },

            // INTERNAL. Use Tag.pictureTags.destroyById() instead.
            "::destroyById::Tag::pictureTags": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Tags/:id/pictureTags/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Tag.pictureTags.updateById() instead.
            "::updateById::Tag::pictureTags": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Tags/:id/pictureTags/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Tag.pictureTags() instead.
            "::get::Tag::pictureTags": {
              isArray: true,
              url: urlBase + "/Tags/:id/pictureTags",
              method: "GET",
            },

            // INTERNAL. Use Tag.pictureTags.create() instead.
            "::create::Tag::pictureTags": {
              url: urlBase + "/Tags/:id/pictureTags",
              method: "POST",
            },

            // INTERNAL. Use Tag.pictureTags.createMany() instead.
            "::createMany::Tag::pictureTags": {
              isArray: true,
              url: urlBase + "/Tags/:id/pictureTags",
              method: "POST",
            },

            // INTERNAL. Use Tag.pictureTags.destroyAll() instead.
            "::delete::Tag::pictureTags": {
              url: urlBase + "/Tags/:id/pictureTags",
              method: "DELETE",
            },

            // INTERNAL. Use Tag.pictureTags.count() instead.
            "::count::Tag::pictureTags": {
              url: urlBase + "/Tags/:id/pictureTags/count",
              method: "GET",
            },
          }
        );



            /**
             * @ngdoc method
             * @name lbServices.PictureTag#upsert
             * @methodOf lbServices.PictureTag
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `PictureTag` object.)
             * </em>
             */
        R["upsert"] = R["patchOrCreate"];

            /**
             * @ngdoc method
             * @name lbServices.PictureTag#updateOrCreate
             * @methodOf lbServices.PictureTag
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `PictureTag` object.)
             * </em>
             */
        R["updateOrCreate"] = R["patchOrCreate"];

            /**
             * @ngdoc method
             * @name lbServices.PictureTag#patchOrCreateWithWhere
             * @methodOf lbServices.PictureTag
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source based on the where criteria.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `PictureTag` object.)
             * </em>
             */
        R["patchOrCreateWithWhere"] = R["upsertWithWhere"];

            /**
             * @ngdoc method
             * @name lbServices.PictureTag#update
             * @methodOf lbServices.PictureTag
             *
             * @description
             *
             * Update instances of the model matched by {{where}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Information related to the outcome of the operation
             */
        R["update"] = R["updateAll"];

            /**
             * @ngdoc method
             * @name lbServices.PictureTag#destroyById
             * @methodOf lbServices.PictureTag
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `PictureTag` object.)
             * </em>
             */
        R["destroyById"] = R["deleteById"];

            /**
             * @ngdoc method
             * @name lbServices.PictureTag#removeById
             * @methodOf lbServices.PictureTag
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `PictureTag` object.)
             * </em>
             */
        R["removeById"] = R["deleteById"];

            /**
             * @ngdoc method
             * @name lbServices.PictureTag#updateAttributes
             * @methodOf lbServices.PictureTag
             *
             * @description
             *
             * Patch attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PictureTag id
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `PictureTag` object.)
             * </em>
             */
        R["updateAttributes"] = R["prototype$patchAttributes"];


        /**
        * @ngdoc property
        * @name lbServices.PictureTag#modelName
        * @propertyOf lbServices.PictureTag
        * @description
        * The name of the model represented by this $resource,
        * i.e. `PictureTag`.
        */
        R.modelName = "PictureTag";


            /**
             * @ngdoc method
             * @name lbServices.PictureTag#picture
             * @methodOf lbServices.PictureTag
             *
             * @description
             *
             * Fetches belongsTo relation picture.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PictureTag id
             *
             *  - `options` – `{object=}` -
             *
             *  - `refresh` – `{boolean=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Picture` object.)
             * </em>
             */
        R.picture = function() {
          var TargetResource = $injector.get("Picture");
          var action = TargetResource["::get::PictureTag::picture"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.PictureTag#tag
             * @methodOf lbServices.PictureTag
             *
             * @description
             *
             * Fetches belongsTo relation tag.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PictureTag id
             *
             *  - `options` – `{object=}` -
             *
             *  - `refresh` – `{boolean=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Tag` object.)
             * </em>
             */
        R.tag = function() {
          var TargetResource = $injector.get("Tag");
          var action = TargetResource["::get::PictureTag::tag"];
          return action.apply(R, arguments);
        };


        return R;
      }]);

/**
 * @ngdoc object
 * @name lbServices.Job
 * @header lbServices.Job
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Job` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
  module.factory(
    "Job",
    [
      'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
      function(LoopBackResource, LoopBackAuth, $injector, $q) {
        var R = LoopBackResource(
        urlBase + "/jobs/:id",
          { 'id': '@id' },
          {

            // INTERNAL. Use Job.user() instead.
            "prototype$__get__user": {
              url: urlBase + "/jobs/:id/user",
              method: "GET",
            },

            // INTERNAL. Use Job.segment() instead.
            "prototype$__get__segment": {
              url: urlBase + "/jobs/:id/segment",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Job#create
             * @methodOf lbServices.Job
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Job` object.)
             * </em>
             */
            "create": {
              url: urlBase + "/jobs",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Job#createMany
             * @methodOf lbServices.Job
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Job` object.)
             * </em>
             */
            "createMany": {
              isArray: true,
              url: urlBase + "/jobs",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Job#patchOrCreate
             * @methodOf lbServices.Job
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Job` object.)
             * </em>
             */
            "patchOrCreate": {
              url: urlBase + "/jobs",
              method: "PATCH",
            },

            /**
             * @ngdoc method
             * @name lbServices.Job#replaceOrCreate
             * @methodOf lbServices.Job
             *
             * @description
             *
             * Replace an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Job` object.)
             * </em>
             */
            "replaceOrCreate": {
              url: urlBase + "/jobs/replaceOrCreate",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Job#upsertWithWhere
             * @methodOf lbServices.Job
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source based on the where criteria.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Job` object.)
             * </em>
             */
            "upsertWithWhere": {
              url: urlBase + "/jobs/upsertWithWhere",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Job#exists
             * @methodOf lbServices.Job
             *
             * @description
             *
             * Check whether a model instance exists in the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `exists` – `{boolean=}` -
             */
            "exists": {
              url: urlBase + "/jobs/:id/exists",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Job#findById
             * @methodOf lbServices.Job
             *
             * @description
             *
             * Find a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `filter` – `{object=}` - Filter defining fields and include - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Job` object.)
             * </em>
             */
            "findById": {
              url: urlBase + "/jobs/:id",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Job#replaceById
             * @methodOf lbServices.Job
             *
             * @description
             *
             * Replace attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Job` object.)
             * </em>
             */
            "replaceById": {
              url: urlBase + "/jobs/:id/replace",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Job#find
             * @methodOf lbServices.Job
             *
             * @description
             *
             * Find all instances of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Job` object.)
             * </em>
             */
            "find": {
              isArray: true,
              url: urlBase + "/jobs",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Job#findOne
             * @methodOf lbServices.Job
             *
             * @description
             *
             * Find first instance of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Job` object.)
             * </em>
             */
            "findOne": {
              url: urlBase + "/jobs/findOne",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Job#updateAll
             * @methodOf lbServices.Job
             *
             * @description
             *
             * Update instances of the model matched by {{where}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Information related to the outcome of the operation
             */
            "updateAll": {
              url: urlBase + "/jobs/update",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Job#deleteById
             * @methodOf lbServices.Job
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Job` object.)
             * </em>
             */
            "deleteById": {
              url: urlBase + "/jobs/:id",
              method: "DELETE",
            },

            /**
             * @ngdoc method
             * @name lbServices.Job#count
             * @methodOf lbServices.Job
             *
             * @description
             *
             * Count instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
            "count": {
              url: urlBase + "/jobs/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Job#prototype$patchAttributes
             * @methodOf lbServices.Job
             *
             * @description
             *
             * Patch attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - job id
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Job` object.)
             * </em>
             */
            "prototype$patchAttributes": {
              url: urlBase + "/jobs/:id",
              method: "PATCH",
            },

            /**
             * @ngdoc method
             * @name lbServices.Job#createChangeStream
             * @methodOf lbServices.Job
             *
             * @description
             *
             * Create a change stream.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `changes` – `{ReadableStream=}` -
             */
            "createChangeStream": {
              url: urlBase + "/jobs/change-stream",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Job#get
             * @methodOf lbServices.Job
             *
             * @description
             *
             * <em>
             * (The remote method definition does not provide any description.)
             * </em>
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `req` – `{object=}` -
             *
             *  - `res` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `result` – `{object=}` -
             */
            "get": {
              url: urlBase + "/jobs/get",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Job#progress
             * @methodOf lbServices.Job
             *
             * @description
             *
             * <em>
             * (The remote method definition does not provide any description.)
             * </em>
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{string}` -
             *
             *  - `state` – `{string=}` -
             *
             *  - `req` – `{object=}` -
             *
             *  - `res` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `result` – `{object=}` -
             */
            "progress": {
              url: urlBase + "/jobs/progress/:id/:state",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Job#complete
             * @methodOf lbServices.Job
             *
             * @description
             *
             * <em>
             * (The remote method definition does not provide any description.)
             * </em>
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{string}` -
             *
             *  - `status` – `{string=}` -
             *
             *  - `req` – `{object=}` -
             *
             *  - `res` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `result` – `{object=}` -
             */
            "complete": {
              url: urlBase + "/jobs/complete/:id/:status",
              method: "GET",
            },

            // INTERNAL. Use Segment.jobs() instead.
            "::get::Segment::jobs": {
              isArray: true,
              url: urlBase + "/Segments/:id/jobs",
              method: "GET",
            },
          }
        );



            /**
             * @ngdoc method
             * @name lbServices.Job#upsert
             * @methodOf lbServices.Job
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Job` object.)
             * </em>
             */
        R["upsert"] = R["patchOrCreate"];

            /**
             * @ngdoc method
             * @name lbServices.Job#updateOrCreate
             * @methodOf lbServices.Job
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Job` object.)
             * </em>
             */
        R["updateOrCreate"] = R["patchOrCreate"];

            /**
             * @ngdoc method
             * @name lbServices.Job#patchOrCreateWithWhere
             * @methodOf lbServices.Job
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source based on the where criteria.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Job` object.)
             * </em>
             */
        R["patchOrCreateWithWhere"] = R["upsertWithWhere"];

            /**
             * @ngdoc method
             * @name lbServices.Job#update
             * @methodOf lbServices.Job
             *
             * @description
             *
             * Update instances of the model matched by {{where}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Information related to the outcome of the operation
             */
        R["update"] = R["updateAll"];

            /**
             * @ngdoc method
             * @name lbServices.Job#destroyById
             * @methodOf lbServices.Job
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Job` object.)
             * </em>
             */
        R["destroyById"] = R["deleteById"];

            /**
             * @ngdoc method
             * @name lbServices.Job#removeById
             * @methodOf lbServices.Job
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Job` object.)
             * </em>
             */
        R["removeById"] = R["deleteById"];

            /**
             * @ngdoc method
             * @name lbServices.Job#updateAttributes
             * @methodOf lbServices.Job
             *
             * @description
             *
             * Patch attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - job id
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Job` object.)
             * </em>
             */
        R["updateAttributes"] = R["prototype$patchAttributes"];


        /**
        * @ngdoc property
        * @name lbServices.Job#modelName
        * @propertyOf lbServices.Job
        * @description
        * The name of the model represented by this $resource,
        * i.e. `Job`.
        */
        R.modelName = "Job";


            /**
             * @ngdoc method
             * @name lbServices.Job#user
             * @methodOf lbServices.Job
             *
             * @description
             *
             * Fetches belongsTo relation user.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - job id
             *
             *  - `options` – `{object=}` -
             *
             *  - `refresh` – `{boolean=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
        R.user = function() {
          var TargetResource = $injector.get("User");
          var action = TargetResource["::get::Job::user"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Job#segment
             * @methodOf lbServices.Job
             *
             * @description
             *
             * Fetches belongsTo relation segment.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - job id
             *
             *  - `options` – `{object=}` -
             *
             *  - `refresh` – `{boolean=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Segment` object.)
             * </em>
             */
        R.segment = function() {
          var TargetResource = $injector.get("Segment");
          var action = TargetResource["::get::Job::segment"];
          return action.apply(R, arguments);
        };


        return R;
      }]);


  module
  .factory('LoopBackAuth', function() {
    var props = ['accessTokenId', 'currentUserId', 'rememberMe'];
    var propsPrefix = '$LoopBack$';

    function LoopBackAuth() {
      var self = this;
      props.forEach(function(name) {
        self[name] = load(name);
      });
      this.currentUserData = null;
    }

    LoopBackAuth.prototype.save = function() {
      var self = this;
      var storage = this.rememberMe ? localStorage : sessionStorage;
      props.forEach(function(name) {
        save(storage, name, self[name]);
      });
    };

    LoopBackAuth.prototype.setUser = function(accessTokenId, userId, userData) {
      this.accessTokenId = accessTokenId;
      this.currentUserId = userId;
      this.currentUserData = userData;
    };

    LoopBackAuth.prototype.clearUser = function() {
      this.accessTokenId = null;
      this.currentUserId = null;
      this.currentUserData = null;
    };

    LoopBackAuth.prototype.clearStorage = function() {
      props.forEach(function(name) {
        save(sessionStorage, name, null);
        save(localStorage, name, null);
      });
    };

    return new LoopBackAuth();

    // Note: LocalStorage converts the value to string
    // We are using empty string as a marker for null/undefined values.
    function save(storage, name, value) {
      try {
        var key = propsPrefix + name;
        if (value == null) value = '';
        storage[key] = value;
      } catch (err) {
        console.log('Cannot access local/session storage:', err);
      }
    }

    function load(name) {
      var key = propsPrefix + name;
      return localStorage[key] || sessionStorage[key] || null;
    }
  })
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('LoopBackAuthRequestInterceptor');
  }])
  .factory('LoopBackAuthRequestInterceptor', ['$q', 'LoopBackAuth',
    function($q, LoopBackAuth) {
      return {
        'request': function(config) {
          // filter out external requests
          var host = getHost(config.url);
          if (host && host !== urlBaseHost) {
            return config;
          }

          if (LoopBackAuth.accessTokenId) {
            config.headers[authHeader] = LoopBackAuth.accessTokenId;
          } else if (config.__isGetCurrentUser__) {
            // Return a stub 401 error for User.getCurrent() when
            // there is no user logged in
            var res = {
              body: { error: { status: 401 }},
              status: 401,
              config: config,
              headers: function() { return undefined; },
            };
            return $q.reject(res);
          }
          return config || $q.when(config);
        },
      };
    }])

  /**
   * @ngdoc object
   * @name lbServices.LoopBackResourceProvider
   * @header lbServices.LoopBackResourceProvider
   * @description
   * Use `LoopBackResourceProvider` to change the global configuration
   * settings used by all models. Note that the provider is available
   * to Configuration Blocks only, see
   * {@link https://docs.angularjs.org/guide/module#module-loading-dependencies Module Loading & Dependencies}
   * for more details.
   *
   * ## Example
   *
   * ```js
   * angular.module('app')
   *  .config(function(LoopBackResourceProvider) {
   *     LoopBackResourceProvider.setAuthHeader('X-Access-Token');
   *  });
   * ```
   */
  .provider('LoopBackResource', function LoopBackResourceProvider() {
    /**
     * @ngdoc method
     * @name lbServices.LoopBackResourceProvider#setAuthHeader
     * @methodOf lbServices.LoopBackResourceProvider
     * @param {string} header The header name to use, e.g. `X-Access-Token`
     * @description
     * Configure the REST transport to use a different header for sending
     * the authentication token. It is sent in the `Authorization` header
     * by default.
     */
    this.setAuthHeader = function(header) {
      authHeader = header;
    };

    /**
     * @ngdoc method
     * @name lbServices.LoopBackResourceProvider#getAuthHeader
     * @methodOf lbServices.LoopBackResourceProvider
     * @description
     * Get the header name that is used for sending the authentication token.
     */
    this.getAuthHeader = function() {
      return authHeader;
    };

    /**
     * @ngdoc method
     * @name lbServices.LoopBackResourceProvider#setUrlBase
     * @methodOf lbServices.LoopBackResourceProvider
     * @param {string} url The URL to use, e.g. `/api` or `//example.com/api`.
     * @description
     * Change the URL of the REST API server. By default, the URL provided
     * to the code generator (`lb-ng` or `grunt-loopback-sdk-angular`) is used.
     */
    this.setUrlBase = function(url) {
      urlBase = url;
      urlBaseHost = getHost(urlBase) || location.host;
    };

    /**
     * @ngdoc method
     * @name lbServices.LoopBackResourceProvider#getUrlBase
     * @methodOf lbServices.LoopBackResourceProvider
     * @description
     * Get the URL of the REST API server. The URL provided
     * to the code generator (`lb-ng` or `grunt-loopback-sdk-angular`) is used.
     */
    this.getUrlBase = function() {
      return urlBase;
    };

    this.$get = ['$resource', function($resource) {
      var LoopBackResource = function(url, params, actions) {
        var resource = $resource(url, params, actions);

        // Angular always calls POST on $save()
        // This hack is based on
        // http://kirkbushell.me/angular-js-using-ng-resource-in-a-more-restful-manner/
        resource.prototype.$save = function(success, error) {
          // Fortunately, LoopBack provides a convenient `upsert` method
          // that exactly fits our needs.
          var result = resource.upsert.call(this, {}, this, success, error);
          return result.$promise || result;
        };
        return resource;
      };

      LoopBackResource.getUrlBase = function() {
        return urlBase;
      };

      LoopBackResource.getAuthHeader = function() {
        return authHeader;
      };

      return LoopBackResource;
    }];
  });
})(window, window.angular);
