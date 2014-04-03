define('widgets/search', ['ui'], function(ui) {
	return {
		name: 'search',

		init: function() {
			return new ymaps.control.SearchControl({
				provider: 'yandex#publicMap',
				useMapBounds: true,
				top: 5,
				left: 5
			});
		}
	}
});