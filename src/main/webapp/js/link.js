/**
 * Module for working with links -- URLs that could lead to objects on map.
 * @class link
 * @singleton
 */
define('link', ['base'], function(base) {
	'use strict';

	/**
	 * @member link
	 * @method current
	 * @return {Object}
	 */
	function getDataFromLocation() {
		var search = location.search.substr(1),
			query = {};

		base.each(search.split('&'), function(part) {
			part = part.split('=');
			var name = part[0],
				value = part[1];
			query[name] = value;
		});

		return query;
	}

	/**
	 * @member link
	 * @method create
	 * @param {String} type
	 * @param {String/Number} [id]
	 * @return {String}
	 */
	function createLink(type, id) {
		return [
			location.origin,
			location.pathname,
			'?',
			'type=', type,
			id ?
				'&id=' + id :
				''
		].join('');
	}

	return {
		current: getDataFromLocation,
		create: createLink
	};
});