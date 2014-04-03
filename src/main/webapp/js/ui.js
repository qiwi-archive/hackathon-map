define(
	'ui',
	[
		'base',
		'widgets/floor',
		'widgets/search',
		'widgets/zoom'
	],
function(base) {
	var widgets = {};

	base.each(base.args(arguments, 1), function(item) {
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

			base.each(this.widgets, function(item) {
				try {
					ctrl.add(item.init());
				} catch (e) {
					throw(['widget broken', e])
				}
			})
		}
	}
});