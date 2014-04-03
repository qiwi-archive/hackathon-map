define('widgets/search', ['ui', 'base', 'search'], function(ui, base, search) {
	var provider = {
		geocode: function(request, options) {
			var promise = new ymaps.util.Promise();

			search.query(request, function(places) {
				var objects = new ymaps.GeoObjectArray();

				base.each(places, function(place) {
					objects.add(new ymaps.Placemark(place.location, {
						name: place.name,
						description: place.description,
						boundedBy: [place.location, place.location]
					}));
				});

				promise.resolve({
					geoObjects: objects,
					metaData: {
						geocoder: {
							request: request,
							found: places.length,
							results: 10,
							skip: 0
						}
					}
				});
			});

			return promise;
		}
	};

	return {
		name: 'search',

		init: function() {
			// TODO autosubmit by timeout

			// WORKAROUND
			setTimeout(function() {
				$('.ymaps-b-search input').focus();
			}, 0);

			return new ymaps.control.SearchControl({
				provider: provider,
				useMapBounds: true,
				top: 5,
				left: 5
			});
		}
	}
});