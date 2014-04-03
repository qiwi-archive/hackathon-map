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

require(['map', 'link', 'place', 'search'], function(map, link, place, search) {
	map.create();

	var current = link.current();
	current.place &&
		place.get(current.place);
});