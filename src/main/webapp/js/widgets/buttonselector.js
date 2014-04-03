define('widgets/buttonselector', ['ui', 'map'], function(ui, map) {
	return {
		name: 'buttonselector',

		init: function() {

			_.each(map.MAP_TYPES, function() {

			});

			var button = new ymaps.control.Button({
			    data: {
			        content: 'Или <em>Я</em>'
			    }
			}, {
			    selectOnClick: false
			   }
			);

			button.events
			    .add('click', function () {alert('Щёлк'); });

			return button;
		}
	}
});