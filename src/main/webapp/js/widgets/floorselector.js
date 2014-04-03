define('widgets/floorselector', ['ui'], function() {
	return {
		name: 'floorselector',

		init: function() {
			return new ymaps.control.TypeSelector(
				['my#type1', 'my#type7']
			);
		}
	}
});