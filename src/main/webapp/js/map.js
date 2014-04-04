/**
 * Module for working with main map.
 * @class map
 * @singleton
 */
define('map', ['base', 'ymaps!', 'search', 'api', 'jquery'], function(base, ymaps, search, api, $) {
	'use strict';

	var MAP_TYPE_PREFIX = 'my#type',
		DEFAULT_FLOOR = 1,
		DEFAULT_MAP_TYPE = MAP_TYPE_PREFIX + DEFAULT_FLOOR,
		MAP_TYPES = [
			{floor: 1, name: '1-й этаж'},
			{floor: 2, name: '2-й этаж'},
			{floor: 3, name: '3-й этаж'},
			{floor: 4, name: '4-й этаж'},
			{floor: 5, name: '5-й этаж'},
			{floor: 6, name: '6-й этаж'},
			{floor: 7, name: '7-й этаж'}
		],
		OBJECT_TYPES = {
			1: 'Рабочее место',
			2: 'Сотрудник',
			3: 'Растение',
			4: 'Слипбокс',
			5: 'Кофе-пойнт',
			6: 'Туалет',
			7: 'Комната тишины',
			8: 'Банкомат',
			9: 'МФУ',
			10: 'Подиум',
			11: 'Нанопоилка',
			12: 'Лифт',
			13: 'Склад',
			14: 'Комната уборщиц',
			15: 'Душ',
			16: 'Переодевалка'
		};

	var theMap,
		currentFloor = DEFAULT_FLOOR,
		currentFilters = [],
		currentResult,
		objectTypes = {};

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

		theMap.events.add('typechange', function (event) {
			var type = event.get('newType'),
				floor = (type || '').replace(MAP_TYPE_PREFIX, '')|0 || DEFAULT_FLOOR;
			setFloor(floor, true);
		});

		api.read(api.TYPES, function(items) {
			base.each(items, function(item) {
				objectTypes[item.hqotId] = item.hqotDescription;
			});
		});

		showFloorPlaces(currentFloor);
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

	/**
	 */
	function showFloorPlaces(floor, filters) {
		theMap.geoObjects.each(function(object) {
			theMap.geoObjects.remove(object);
		});

		api.read(api.PLACES, {floor: floor, filters: filters}, function(data) {
			var objects = [],
				limit = 100;
			base.each(data, function(item, i) {
				var id = item.hqoId,
					name = item.hqoName,
					location = [item.hqptX, item.hqptY],
					fl = item.hqptFloor,
					type = item.hqoType;
				if (fl != floor) {
					return;
				}

				objects.push(new ymaps.Placemark(
					location,
					{
						clusterCaption: name,
						balloonContent: [name, objectTypes[type] || 'Неизвестнвй объект', floor + '-й этаж'].join('<br />')
					},
					{
						preset: 'twirl#blackDotIcon'
					}
				));
			});

			var clusterer = new ymaps.Clusterer({
				preset: 'twirl#invertedBlackClusterIcons',
				groupByCoordinates: false,
				clusterDisableClickZoom: true,
				gridSize: 64
			});

			clusterer.add(objects);

			theMap.geoObjects.add(clusterer);
		});
	}

	/**
	 * @param {Object} result
	 */
	function showResult(result) {
		var floor = result.properties.get('floor');
		setFloor(floor);

		currentResult &&
			theMap.geoObjects.remove(currentResult);
		currentResult = result;

		theMap.geoObjects.add(result);
	}

	/**
	 */
	function hideResult() {
		currentResult &&
			theMap.geoObjects.remove(currentResult);
	}

	/**
	 */
	function getFloor() {
		return currentFloor;
	}

	/**
	 * @param {Number} floor
	 */
	function setFloor(floor, skipSetType) {
		if (floor === currentFloor) {
			return;
		}

		currentFloor = floor;
		showFloorPlaces(floor);

		if (!skipSetType) {
			var type = MAP_TYPE_PREFIX + floor;
			type !== theMap.getType() &&
				theMap.setType(type);
		}
	}

	/**
	 * @param {Number} floor
	 */
	function setFilters(filters) {
		currentFilters = filters;

		showFloorPlaces(currentFloor, currentFilters);
	}

	return {
		create: createMap,
		showResult: showResult,
		hideResult: hideResult,
		getFloor: getFloor,
		setFloor: setFloor,
		setFilters: setFilters
	};
});