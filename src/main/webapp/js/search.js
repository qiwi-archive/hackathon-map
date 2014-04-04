/**
 * Module for searching.
 * @class search
 * @singleton
 */
define('search', ['base', 'api'], function(base, api) {
	'use strict';

	var emulatedPlaces;

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

		emulatedPlaces ?
			base.call(callback, scope, emulatedPlaces) :
			api.read(api.SEARCH, {query: string}, callback, scope);
	}

	/**
	 * @member search
	 * @method emulate
	 * @param {Object} place
	 */
	function emulate(place) {
		if (!this.control) {
			return;
		}

		emulatedPlaces = [place];
		this.control.search(place.name);
		emulatedPlaces = null;
	}

	return {
		query: query,
		emulate: emulate
	}
});