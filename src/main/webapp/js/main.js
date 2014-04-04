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

	var theMap = map.create();
	ui.initWidgets(theMap);

	var current = link.current();
	current.place &&
		place.get(current.place);
});