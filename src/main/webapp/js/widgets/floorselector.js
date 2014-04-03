define('widgets/floorselector', ['ui'], function() {
	return {
		name: 'floorselector',

		/**
		 * @public
		 * @returns {ymaps.control.TypeSelector}
		 */
		init: function() {
			var cmp = new ymaps.control.TypeSelector(
				['my#type1', 'my#type7']
			);
			this.setEvents(cmp);

			return cmp;
		},

		/**
		 * @private
		 * @param cmp
		 */
		setEvents: function(cmp) {
			cmp.events
			    .add('click', function () { console.log('Щёлк'); })
			    .add('select', function () { console.log('Нажата'); })
			    .add('deselect', function () { console.log('Отжата'); });
			return cmp;
		}
	}
});