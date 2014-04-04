define('widgets/search', ['ui', 'base', 'search', 'map'], function(ui, base, search, map) {
	var provider = {
		geocode: function(request, options) {
			var promise = new ymaps.util.Promise();

			search.query(request, function(places) {
				var objects = new ymaps.GeoObjectArray();

				base.each(places, function(place) {
					var location = [place.hqptX, place.hqptY];

					objects.add(new ymaps.Placemark(location, {
						id: place.hqoId,
						name: place.hqoName,
						floor: place.hqptFloor,
						location: location,
						boundedBy: [location, location]
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
				useMapBounds: true,
				noPlacemark: true
			});

			control.events
				.add('resultselect', this.onResultSelect, control);

			// NOTE tight coupling
			search.control = control;

			return {
				control: control,
				options: {
					left: 100
				}
			};
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
			map.showResult(result);
		}
	};
});