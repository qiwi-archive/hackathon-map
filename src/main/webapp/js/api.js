/**
 * Helper for working with server APIs.
 * @class api
 * @singleton
 */
define('api', ['base', 'log', 'jquery'], function(base, log, $) {
	'use strict';

	var PREFIX = 'api',
		SEARCH = 'search',
		PLACE = 'load_object',
		PLACES = 'load_points',
		TYPES = 'type_list',
		ADD = 'add';

	function formatQuery(query) {
		var parts = [];
		base.each(query, function(value, name) {
			parts.push(
				base.isUndefined(value) ?
					name :
					name + '=' + value
			);
		});
		return parts.length ?
			'?' + parts.join('&') :
			'';
	}

	function formatOptions(method, namespace, id, query, callback, scope) {
		if (base.isFunction(id)) {
			scope = query;
			callback = id;
			query = id = null;
		} else if (base.isObject(id)) {
			scope = callback;
			callback = query;
			query = id;
			id = null;
		} else if (base.isFunction(query)) {
			scope = callback;
			callback = query;
			query = null;
		}

		return {method: method, namespace: namespace, id: id, query: query, callback: callback, scope: scope};
	}

	/**
	 * @member api
	 * @method request
	 * @param {Object} options
	 */
	function request(options) {
		var method = options.method || 'GET',
			namespace = '/' + options.namespace,
			id = options.id ? '/' + options.id : '',
			query = options.query,
			callback = options.callback,
			scope = options.scope;

		var url = PREFIX + namespace + id + formatQuery(query);
		log('api', method, url);

		$.ajax({
			method: method,
			url: url,
			dataType: 'json',
			success: function(data, status, xhr) {
				//log.debug('api', method, url, data);
				base.call(callback, scope, data);
			},
			error: function(xhr, status, message) {
				log.error('api', method, url, status.message);
			}
		});
	}

	/**
	 * @member api
	 * @method read
	 * @param {String} namespace
	 * @param {String/Number} [id]
	 * @param {Object} [query]
	 * @param {Function} callback
	 * @param {Mixed} [scope]
	 */
	function read(namespace, id, query, callback, scope) {
		return request(formatOptions('GET', namespace, id, query, callback, scope));
	}

	/**
	 * @member api
	 * @method write
	 * @param {String} namespace
	 * @param {String/Number} [id]
	 * @param {Object} [query]
	 * @param {Function} callback
	 * @param {Mixed} [scope]
	 */
	function write(namespace, id, query, callback, scope) {
		return request(formatOptions('POST', namespace, id, query, callback, scope));
	}

	return {
		SEARCH: SEARCH,
		PLACE: PLACE,
		PLACES: PLACES,
		TYPES: TYPES,
		ADD: ADD,

		request: request,
		read: read,
		write: write
	};
});