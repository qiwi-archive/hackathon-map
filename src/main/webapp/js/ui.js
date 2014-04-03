define('ui', [
	'widgets/floorselector',
	'widgets/zoomcontrol',
	'widgets/search'
], function() {
	var widgets = {},
		args = Array.prototype.slice.call(arguments, 0);

	_.each(args, function(item) {
		item &&
			(widgets[item.name] = item);
	});

	return {
		widgets: widgets,

		/**
		 * @public
		 * @param {ymaps.Map} map
		 */
		initWidgets: function(map) {
			var ctrl = map.controls;

			_.each(this.widgets, function(item) {
				try {
					ctrl.add(item.init());
				} catch (e) {
					throw(['widget broken', e])
				}
			})
		}
	}

});