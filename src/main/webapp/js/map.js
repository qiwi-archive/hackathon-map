/**
 * Module for working with main map.
 * @class map
 * @singleton
 */
define('map', ['base', 'ymaps!', 'search', 'jquery'], function(base, ymaps, search, $) {
	'use strict';

	function initSearch(map) {
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
						// Геообъекты поисковой выдачи.
						geoObjects: objects,
						// Метаинформация ответа.
						metaData: {
							geocoder: {
								// Строка обработанного запроса.
								request: request,
								// Количество найденных результатов.
								found: places.length,
								// Количество возвращенных результатов.
								results: 10,
								// Количество пропущенных результатов.
								skip: 0
							}
						}
					});
				});

				return promise;
			}
		};

		var control = new ymaps.control.SearchControl({
			provider: provider,
			//noCentering: true,
			//noPlacemark: true,
			useMapBounds: true
		});

		map.controls.add(control);

		// TODO autosubmit by timeout

		// WORKAROUND
		setTimeout(function() {
			$('.ymaps-b-search input').focus();
		}, 0);
	}

	function createMap() {
		var myProjection = new ymaps.projection.Cartesian([
				// Определяем границы области отображения в декартовых координатах.
				[-1, -1],
				[1, 1]
			]),

		// Создадим собственный слой карты:
			MyLayer = function () {
				return new ymaps.Layer(
					// Зададим функцию, преобразующую номер тайла
					// и уровень масштабировая в URL тайла на сервере.
					function (tile, zoom) {
						return "/tiles/" + zoom + "/tile-" + tile[0] + "-" + tile[1] + ".jpg";
					}
				);
			};

		// Добавим конструктор слоя в хранилище слоёв под ключом my#layer.
		ymaps.layer.storage.add('my#layer', MyLayer);
		// Создадим новый тип карты, состоящий только из нашего слоя тайлов,
		// и добавим его в хранилище типов карты под ключом my#type.
		ymaps.mapType.storage.add('my#type', new ymaps.MapType(
			'Схема',
			['my#layer']
		));

		// Создадим карту в заданной системе координат.
		return new ymaps.Map('map', {
			center:[1, -1],
			zoom:7,
			type:'my#type'
		}, {
			maxZoom:10, // Максимальный коэффициент масштабирования для заданной проекции.
			minZoom:7, // Минимальный коэффициент масштабирования.
			projection:myProjection
		});

		initSearch(myMap);
	}

	return {
		create: createMap
	};
});