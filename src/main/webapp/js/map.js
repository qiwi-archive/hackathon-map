/**
 * Module for working with main map.
 * @class map
 * @singleton
 */
define('map', ['base', 'ymaps!', 'search', 'jquery'], function(base, ymaps, search, $) {
	'use strict';

	var MAP_TYPE_PREFIX = 'my#type',
		DEFAULT_MAP_TYPE = MAP_TYPE_PREFIX + 3,
		MAP_TYPES = [
			//{floor: 1, name: '1-й этаж'},
			//{floor: 2, name: '2-й этаж'},
			{floor: 3, name: '3-й этаж'},
			{floor: 4, name: '4-й этаж'},
			{floor: 5, name: '5-й этаж'},
			{floor: 6, name: '6-й этаж'},
			{floor: 7, name: '7-й этаж'}
		];

	var theMap;

	var officeWidth = 86,
		officeHeight = 16,
		marginHorizontal = 9.7, // by hands
		marginVertical = 11.7, // by hands
		areaWidth = officeWidth + 2 * marginHorizontal,
		pictureWidth = 8192, // width + 2 margins
		pictureHeight = 3072; // height + 2 margins

	var bounds = [
		[-marginHorizontal, -areaWidth * 20 / 32 - marginVertical],
		[areaWidth - marginHorizontal, areaWidth * 12 / 32 - marginVertical]
	];
	var looseConstraints = [
		[-marginHorizontal * 4, -marginVertical * 4],
		[areaWidth + marginHorizontal * 2, areaWidth * 12 / 32 + marginHorizontal * 2]
	];
	var strictConstraints = [
		[-marginHorizontal, -marginVertical],
		bounds[1]
	];

	/**
	 * @public
	 * @return {ymaps.Map}
	 */
	function createMap() {
		var projection = new ymaps.projection.Cartesian(bounds);

		base.each(MAP_TYPES, makeMapTypeInstance);

		theMap = new ymaps.Map('map', {
			center: [officeWidth / 2, officeHeight / 2],
			zoom: 3,
			type: DEFAULT_MAP_TYPE,
			behaviors: ['default', 'scrollZoom']
		}, {
			maxZoom: 5,
			minZoom: 2,
			projection: projection,
			restrictMapArea: looseConstraints
		});

		// DEBUG
	/*
		theMap.events.add('click', function (event) {
			theMap.balloon.isOpen() &&
				theMap.balloon.close();
			var coords = event.get('coordPosition');
			theMap.balloon.open(coords, {
				contentBody: [
					coords[0].toPrecision(6),
					coords[1].toPrecision(6)
				].join(', ')
			});
		});
	*/
		this.theMap = theMap;

		return theMap;
	}

	/**
	 * @param {Object} config
	 */
	function makeMapTypeInstance(config) {
		var Layer = function () {
			return new ymaps.Layer(
				'tiles/' + config.floor + '/%z/%x-%y.png',
				{notFoundTile: 'tiles/empty.png'}
			);
		};

		ymaps.layer.storage.add('my#layer' + config.floor, Layer);
		ymaps.mapType.storage.add('my#type' + config.floor, new ymaps.MapType(
			config.name,
			['my#layer' + config.floor]
		));
	}

	var currentResult;

	/**
	 * @param {Object} result
	 */
	function showResult(result) {
		currentResult &&
			theMap.geoObjects.remove(currentResult);

		currentResult = new ymaps.Placemark(
			result.properties.get('location'),
			{},
			{
				preset: 'twirl#redDotIcon'
			}
		);
		theMap.geoObjects.add(currentResult);
	}

	/**
	 */
	function hideResult() {
		currentResult &&
			theMap.geoObjects.remove(currentResult);
	}

	/**
	 * @param {Number} floor
	 */
	function setFloor(floor) {
		var type = MAP_TYPE_PREFIX + floor;
		type !== theMap.getType() &&
			theMap.setType(type);
	}

	return {
		create: createMap,
		showResult: showResult,
		hideResult: hideResult,
		setFloor: setFloor
	};
});