/**
 * Module for working with main map.
 * @class map
 * @singleton
 */
define('map', ['base', 'ymaps!', 'search', 'jquery'], function(base, ymaps, search, $) {
	'use strict';

	var officeWidth = 86,
		officeHeight = 16,
		marginHorizontal = 25,
		marginVertical = 17.4,
		areaWidth = officeWidth + 2 * marginHorizontal,
		pictureWidth = 4096, // width + 2 margins
		pictureHeight = 1536; // height + 2 margins

	var bounds = [
		[-marginHorizontal, -areaWidth * 10 / 16 - marginVertical],
		[areaWidth - marginHorizontal, areaWidth * 6 / 16 - marginVertical]
	];
	var looseConstraints = [
		[-marginHorizontal * 3, -marginVertical * 3],
		[areaWidth + marginHorizontal, areaWidth * 6 / 16 + marginHorizontal]
	];
	var strictConstraints = [
		[-marginHorizontal, -marginVertical],
		bounds[1]
	];

	/**
	 * @public
	 * @returns {ymaps.Map}
	 */
	function createMap() {
		var projection = new ymaps.projection.Cartesian(bounds);

		_.each(this.MAP_TYPES, makeMapTypeInstance);

		var map = new ymaps.Map('map', {
			center: [officeWidth / 2, officeHeight / 2],
			zoom: 2,
			type: this.DEFAULT_MAP_TYPE,
			behaviors: ['default', 'scrollZoom']
		}, {
			maxZoom: 4,
			minZoom: 3,
			projection: projection,
			restrictMapArea: looseConstraints
		});

		// DEBUG
		map.events.add('click', function (e) {
			map.balloon.isOpen() &&
				map.balloon.close();
			var coords = e.get('coordPosition');
			map.balloon.open(coords, {
				contentBody: [
					coords[0].toPrecision(6),
					coords[1].toPrecision(6)
					].join(', ')
			});
		});

		return map;
	}

	/**
	 * @param {Object} config
	 */
	function makeMapTypeInstance(config) {
		var Layer = function () {
			return new ymaps.Layer(
				'tiles/' + config.level + '/%z/%x-%y.png',
				{
					notFoundTile: 'tiles/empty.png'
				}
			);
		};

		ymaps.layer.storage.add('my#layer' + config.level, Layer);
		ymaps.mapType.storage.add('my#type' + config.level, new ymaps.MapType(
			config.name,
			['my#layer' + config.level]
		));
	}

	return {
		DEFAULT_MAP_TYPE_PREFIX: 'my#type',
		DEFAULT_MAP_TYPE: 'my#type3',
		MAP_TYPES: [
			//{level: 1, name: 'первый этаж'},
			//{level: 2, name: 'второй этаж'},
			{level: 3, name: 'третий этаж'},
			{level: 4, name: 'четвертый этаж'},
			{level: 5, name: 'пятый этаж'},
			{level: 6, name: 'шестой этаж'},
			{level: 7, name: 'седьмой этаж'}
		],

		create: createMap
	};
});