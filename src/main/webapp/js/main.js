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
require(['log', 'map', 'ui', 'link', 'place', 'search'], function(log, map, ui, link, place, search) {
	log('Hi there!');

	window.QiwiMap = map = map.create();
	ui.initWidgets(map);

	var current = link.current();
	current.place &&
		place.get(current.place);
});