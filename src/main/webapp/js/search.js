define('search', ['base', 'api'], function(base, api) {
	/**
	 * @member search
	 * @method query
	 * @param {String} string
	 * @param {Object} options
	 * @param {Function} callback
	 * @param {Object} callback.data
	 * @param {Mixed} [scope]
	 */
	function query(string, options, callback, scope) {
		if (base.isFunction(options)) {
			scope = callback;
			callback = options;
		}
		options = options || {};

		api.read('search', {query: string}, callback, scope);
	}

	return {
		query: query
	}
});