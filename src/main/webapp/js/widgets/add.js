define('widgets/add', ['ui', 'map', 'api', 'log'], function(ui, map, api, log) {
	'use strict';

	var button,
		currentCursor,
		currentBalloon;
	return {
		name: 'add',

		/**
		 * @public
		 * @return {ymaps.control.TypeSelector}
		 */
		init: function() {
			button = new ymaps.control.Button({
				data: {
					content: 'Добавить',
					title: 'Добавить объект на этаж'
				},
				options: {
					selectOnClick: true
				}
			});

			button.events.add('select', this.onSelect);
			button.events.add('deselect', this.onDeselect);

			map.theMap.events.add('click', this.onMapClick);

			return {
				control: button,
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
			currentBalloon.close();
		},

		onMapClick: function(event) {
			if (!currentCursor) {
				return;
			}
			var location = event.get('coordPosition'),
				floor = map.getFloor();

			map.theMap.balloon.isOpen() &&
				map.theMap.balloon.close();

			var form = $('<form method="post" action="#">' +
				'<label for="name">Название</label><br/><input id="name_input" name="name" type="text" required/><br/>' +
				'<label for="type">Тип</label><br/><select id="type_input">' + _(map.OBJECT_TYPES).map(function(item, key) {
				return '<option value="' + key + '">' + item + '</option>';
			}) + '</select><br/>' +
				'<input type="submit" value="Добавить"/> </form>"');
			form.submit(function(e) {
				e.preventDefault();
				var name = form.find("#name_input").val();
				var type = form.find("#type_input").val();
				api.write(api.ADD, {
						x: location[0].toPrecision(6),
						y: location[1].toPrecision(6),
						floor: floor,
						name: name,
						type: type
					},
					function(result) {
						log.info(result);
						if (result && result.success) {
							map.theMap.geoObjects.add(new ymaps.Placemark(
								location,
								{
									clusterCaption: name,
									balloonContent: [name, map.OBJECT_TYPES[type] || 'Неизвестный объект', floor + '-й этаж'].join('<br />')
								},
								{
									preset: 'twirl#blackDotIcon'
								}
							));
							map.theMap.balloon.close();
							button.deselect();
						}
						else {
							//todo: better notifier
							alert("При добавлении произошла ошибка.");
							map.theMap.balloon.close();
							button.deselect();
						}
					});
			});
			currentBalloon = map.theMap.balloon.open(location, {
				contentHeader: 'Добавить объект',
				contentBody: form[0],
				contentFooter: "X,Y: " + [location[0].toPrecision(6), location[1].toPrecision(6)].join(', ')
			});
		}
	}
});