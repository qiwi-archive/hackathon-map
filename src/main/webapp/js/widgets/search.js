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
						level: place.level,
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
		 * @returns {ymaps.control.SearchControl}
		 */
		init: function() {
			// TODO autosubmit by timeout

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

			return control;
		},

		/**
		 * @private
		 * @param {ymap.Event} evt
		 */
		onResultSelect: function(evt) {
			var index = evt.get('resultIndex'),
				result = this.getResultsArray()[index],
				level = result.properties.get('level'),
				newMapType = map.DEFAULT_MAP_TYPE_PREFIX + level;

			if (newMapType !== QiwiMap.getType()) {
				QiwiMap.setType(newMapType)
			}
		}

	}
});