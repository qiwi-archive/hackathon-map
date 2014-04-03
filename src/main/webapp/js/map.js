/**
 * Module for working with main map.
 * @class map
 * @singleton
 */
define('map', ['base', 'ymaps!', 'search', 'jquery'], function(base, ymaps, search, $) {
	'use strict';

	var DEFAULT_MAP_TYPE = 'my#type1',
		MAP_TYPES = [
			{level: 1},
			{level: 2},
			{level: 3},
			{level: 4},
			{level: 5},
			{level: 6},
			{level: 7}
		];

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

		_.each(MAP_TYPES, makeMapInstance);

		// Создадим карту в заданной системе координат.
		return new ymaps.Map('map', {
			center:[1, -1],
			zoom:7,
			type: DEFAULT_MAP_TYPE
		}, {
			maxZoom:10, // Максимальный коэффициент масштабирования для заданной проекции.
			minZoom:7, // Минимальный коэффициент масштабирования.
			projection:myProjection
		});
	}

	/**
	 * @param {Object} config
	 */
	function makeMapInstance(config) {
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
			'Схема',
			['my#layer' + config.level]
		));
	}

	return {
		create: createMap
	};
});