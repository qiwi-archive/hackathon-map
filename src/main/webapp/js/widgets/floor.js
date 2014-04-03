define('widgets/floor', ['ui'], function() {
	return {
		name: 'floor',

		/**
		 * @public
		 * @returns {ymaps.control.TypeSelector}
		 */
		init: function() {
			var cmp = new ymaps.control.TypeSelector(
				['my#type3', 'my#type4', 'my#type5', 'my#type6', 'my#type7'],
				{
					position: {left: 5}
				}
			);

			return cmp;
		}
	}
});