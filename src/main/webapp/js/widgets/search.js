define('widgets/search', ['ui', 'base', 'search', 'map'], function(ui, base, search, map) {
	var provider = {
		geocode: function(request, options) {
			var promise = new ymaps.util.Promise();

			search.query(request, function(places) {
				var objects = new ymaps.GeoObjectArray();

				base.each(places, function(place) {
					objects.add(new ymaps.Placemark(place.location, {
						id: place.id,
						name: place.name,
						floor: place.floor,
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

		/**
		 * @public
		 * @return {ymaps.control.SearchControl}
		 */
		init: function() {
			// TODO autosearch by timeout.
			// TODO remove search results when user clears input.

			// WORKAROUND
			setTimeout(function() {
				$('.ymaps-b-search input').focus();
			}, 0);

			var control = new ymaps.control.SearchControl({
				provider: provider,
				useMapBounds: true
			});

			control.events
				.add('resultselect', this.onResultSelect, control);

			// NOTE tight coupling
			search.control = control;

			return control;
		},

		/**
		 * @private
		 * @param {ymap.Event} evt
		 */
		onResultSelect: function(evt) {
			var index = evt.get('resultIndex'),
				result = this.getResultsArray()[index],
				floor = result.properties.get('floor');
			map.setFloor(floor);
		}
	};
});