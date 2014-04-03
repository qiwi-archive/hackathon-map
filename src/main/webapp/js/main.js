'use strict';

/**
 * RequireJS configuration.
 * @ignore
 */
require.config({
	baseUrl: 'js',
	paths: {
		jquery: 'lib/jquery-1.11.0',
		underscore: 'lib/underscore'
	},
	shim: {
		jquery: {
			exports: '$'
		},
		underscore: {
			exports: '_'
		}
	}
});

/**
 * Main application logic.
 * @ignore
 */
require(['log', 'map', 'link', 'place', 'search'], function(log, map, link, place, search) {
	log('Hi there!');

	map.create();

	var current = link.current();
	current.place &&
		place.get(current.place);
});