define('widgets/add', ['ui'], function() {
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

			return {
				control: control,
				options: {
					float: 'left',
					floatIndex: 3,
					maxWidth: 150
				}
			};
		}
	}
});