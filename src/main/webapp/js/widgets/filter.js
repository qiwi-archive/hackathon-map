define('widgets/filter', ['ui', 'api'], function () {
	'use strict';

	return {
		name: 'filter',

		buttonLayout: "<div class='my-button [if state.selected]my-button-selected[endif]'>$[data.content]</div>",

		/**
		 * @public
		 * @return {ymaps.control.RollupButton}
		 */
		init: function () {
			return new ymaps.control.Group(
				{
					items: [
						makeButtonInstance({name: 'filter1', layout: this.buttonLayout}),
						makeButtonInstance({name: 'filter2', layout: this.buttonLayout}),
						makeButtonInstance({name: 'filter3', layout: this.buttonLayout})
					]
				}, {
					position: {right: 5, top: 5}
				}
			);
		},

		/**
		 * @private
		 * @param config
		 * @returns {ymaps.control.Button}
		 */
		makeButtonInstance: function(config) {
			var button = new ymaps.control.Button(
				{
					data: {
						content: config.name
					},
					layout: config.layout
				}
			);

			button.event
				.add('click', this.onFilterChange);

			return button;
		},

		/**
		 * @private
		 */
		onFilterChange: function() {

		}
	};
});