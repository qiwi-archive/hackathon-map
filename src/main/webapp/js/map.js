define('map', ['ymaps', 'search'], function(ymaps, search) {
	ymaps.ready(function() {
		search.query('test');
		new ymaps.Map('map', {
			center:[55.637065, 37.598555],
			zoom: 16
		});
	});
});