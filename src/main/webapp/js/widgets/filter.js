define('widgets/filter', ['ui', 'map'], function (ui, map) {
	'use strict';

	return {
		name: 'filter',

		map: map,
		WORKPLACE_ID: 1,
		HUMAN_ID: 2,

		buttonLayout: "<div class='my-button [if state.selected]my-button-selected[endif]'>$[data.content]</div>",

		/**
		 * @public
		 * @return {ymaps.control.Group}
		 */
		init: function () {
			this.control = new ymaps.control.Group(
				{
					items: [
						this.makeButtonInstance({name: 'рабочие места', filterId: this.WORKPLACE_ID}),
						this.makeButtonInstance({name: 'сотрудники', filterId: this.HUMAN_ID})
					]
				}
			);

			return {
				control: this.control,
				options: {
					right: 5
				}
			}
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
					layout: this.buttonLayout
				}
			);

			button.filterId = config.filterId;
			button.events
				.add('click', this.onFilterChange, this);

			return button;
		},

		/**
		 * @private
		 */
		onFilterChange: function(evt) {
			var filters = [],
				btn = evt.originalEvent.target;

			btn.pressed = !btn.pressed;
			var buttons = this.control.filter(function(b) {
				return !b.pressed;
			});

			_.each(buttons, function(b) {
				filters.push(b.filterId)
			});

			this.map.setFilters(filters)
		}
	};
});