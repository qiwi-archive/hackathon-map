define('widgets/floor', ['ui'], function() {
	return {
		name: 'floor',

		/**
		 * @public
		 * @return {ymaps.control.TypeSelector}
		 */
		init: function() {
			var control = new ymaps.control.TypeSelector(
				['my#type1', 'my#type2', 'my#type3', 'my#type4', 'my#type5', 'my#type6', 'my#type7']
			);

			return {
				control: control,
				options: {
					left: 5
				}
			};
		}
	}
});