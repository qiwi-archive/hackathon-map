define('api', ['base', 'log', 'jquery'], function(base, log, $) {
	var PREFIX = '/api';

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

	function request(namespace, id, query) {
		if (base.isObject(id) && !query) {
			query = id;
			id = '';
		}

		var url = PREFIX + '/' + namespace + (id ? '/' + id : '') + formatQuery(query);

		log('api', url);

		//$.ajax
	}

	return {
		request: request
	};
});