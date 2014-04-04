define('widgets/add', ['ui', 'map'], function(ui, map) {
	'use strict';

	var currentCursor,
		currentBalloon;
/*
		// DEBUG
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
	return {
		name: 'add',

		/**
		 * @public
		 * @return {ymaps.control.TypeSelector}
		 */
		init: function() {
			var control = new ymaps.control.Button({
				data: {
					content: 'Добавить',
					title: 'Добавить объект на этаж'
				},
				options: {
					selectOnClick: true
				}
			});

			control.events.add('select', this.onSelect);
			control.events.add('deselect', this.onDeselect);

			map.theMap.events.add('click', this.onMapClick);

			return {
				control: control,
				options: {
					left: 345
				}
			};
		},

		onSelect: function(event) {
			currentCursor = map.theMap.cursors.push('crosshair');
		},

		onDeselect: function(event) {
			currentCursor.remove();
			currentCursor = null;
		},

		onMapClick: function(event) {
			if (!currentCursor) {
				return;
			}
			var location = event.get('coordPosition'),
				floor = map.getFloor();

			map.theMap.balloon.isOpen() &&
				map.theMap.balloon.close();

			map.theMap.balloon.open(location, {
				contentBody: [
					'Добавить объект'
				].join('<br />')
			});
		}
	}
});