define('map', ['ymaps', 'search'], function(ymaps, search) {
	ymaps.ready(function() {
		search.query('test');
	});
});