/**
 * Module for working with main map.
 * @class map
 * @singleton
 */
define('map', ['base', 'ymaps!', 'search', 'jquery'], function(base, ymaps, search, $) {
	'use strict';

	/**
	 * @public
	 * @returns {ymaps.Map}
	 */
	function createMap() {
		var myProjection = new ymaps.projection.Cartesian([
				// Определяем границы области отображения в декартовых координатах.
				[-1, -1],
				[1, 1]
			]);

		_.each(this.MAP_TYPES, makeMapTypeInstance);

		// Создадим карту в заданной системе координат.
		return new ymaps.Map('map', {
			center:[1, -1],
			zoom:7,
			type: this.DEFAULT_MAP_TYPE,
			behaviors: ['default', 'scrollZoom']
		}, {
			maxZoom:10, // Максимальный коэффициент масштабирования для заданной проекции.
			minZoom:7, // Минимальный коэффициент масштабирования.
			projection:myProjection
		});
	}

	/**
	 * @param {Object} config
	 */
	function makeMapTypeInstance(config) {
		var MyLayer = function () {
			return new ymaps.Layer(
				// Зададим функцию, преобразующую номер тайла
				// и уровень масштабировая в URL тайла на сервере.
				function (tile, zoom) {
					return "/tiles/" + config.level + "/" + zoom + "/tile-" + tile[0] + "-" + tile[1] + ".jpg";
				}
			);
		};

		// Добавим конструктор слоя в хранилище слоёв под ключом my#layer.
		ymaps.layer.storage.add('my#layer' + config.level, MyLayer);
		// Создадим новый тип карты, состоящий только из нашего слоя тайлов,
		// и добавим его в хранилище типов карты под ключом my#type.
		ymaps.mapType.storage.add('my#type' + config.level, new ymaps.MapType(
			config.name,
			['my#layer' + config.level]
		));
	}

	return {
		DEFAULT_MAP_TYPE_PREFIX: 'my#type',
		DEFAULT_MAP_TYPE: 'my#type1',
		MAP_TYPES: [
			{level: 1, name: 'первый этаж'},
			{level: 2, name: 'второй этаж'},
			{level: 3, name: 'третий этаж'},
			{level: 4, name: 'четвертый этаж'},
			{level: 5, name: 'пятый этаж'},
			{level: 6, name: 'шестой этаж'},
			{level: 7, name: 'седьмой этаж'}
		],

		create: createMap
	};
});