define('widgets/type', ['ui'], function() {
	'use strict';

	return {
		name: 'type',

		/**
		 * @public
		 * @return {ymaps.control.ListBox}
		 */
		init: function() {
			var control = new ymaps.control.ListBox({
					data: {
						title: 'Тип объектов'
					},
					items: [
						new ymaps.control.ListBoxItem('Рабочее место'),
						new ymaps.control.ListBoxItem('Помещение'),
						new ymaps.control.ListBoxItem('Прочее')
					]
				});
			control.get(0).events.add('click', function () {
				//map.setCenter([55.752736, 37.606815]);
			});
			control.get(1).events.add('click', function () {
				//map.setCenter([55.026366, 82.907803]);
			});
			control.get(2).events.add('click', function () {
				//map.setCenter([40.695537, -73.97552]);
			});

			return {control: control};
		}
	};
});