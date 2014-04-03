define('widgets/floorselector', ['ui'], function() {
	var floors = [
		'7 floor - IT Developers, QA',
		'6 floor - IT Administrators',
		'5 floor',
		'4 floor',
		'3 floor',
		'2 floor',
		'1 floor - Reception, STOLOVKA',
		'-1 floor - Garage',
		'-2 floor - Garage'
	];

	return {
		name: 'floorselector',

		init: function() {
			return new ymaps.control.TypeSelector(
				{
					mapTypes: floors
				},
				{
					top: 5,
					left: 5

				}
			)
		}
	}
});