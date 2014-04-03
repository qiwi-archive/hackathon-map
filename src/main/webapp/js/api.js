define('api', ['base', 'log', 'jquery'], function(base, log, $) {
	var PREFIX = 'api',
		SEARCH = 'search',
		PLACE = 'place';

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
		}
		else if (base.isObject(id)) {
			scope = callback;
			callback = query;
			query = id;
			id = null;
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
				callback.call(scope, data);
			},
			error: function(xhr, status, message) {
				callback.call(scope, {foo: 'bar'});
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
		return request(formatOptions('GET', namespace, id, query, callback, scope));
	}

	return {
		SEARCH: SEARCH,
		PLACE: PLACE,

		request: request,
		read: read,
		write: write
	};
});