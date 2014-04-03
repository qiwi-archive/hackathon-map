define('widgets/floorselector', ['ui'], function() {
	var floors = [
		'my#layer',
		'my#layer1'
	];

	return {
		name: 'floorselector',

		init: function() {
			var t = new ymaps.control.TypeSelector(
				{
					mapTypes: floors
				},
				{
					top: 5,
					left: 5

				}
			);
			debugger;


			return t;
		}
	}
});