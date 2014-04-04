define(
	'ui',
	[
		'base',
		'log',
		'widgets/floor',
		'widgets/search',
		'widgets/type',
		'widgets/zoom'
	],
function(base, log) {
	var widgets = {};

	base.each(base.args(arguments, 2), function(widget) {
		widget &&
			(widgets[widget.name] = widget);
	});

	return {
		widgets: widgets,

		/**
		 * @public
		 * @param {ymaps.Map} map
		 */
		initWidgets: function(map) {
			var ctrl = map.controls;

			base.each(this.widgets, function(widget) {
				try {
					log('ui', 'widget', widget.name);
					ctrl.add(widget.init());
				} catch (e) {
					throw(['widget broken', e])
				}
			})
		}
	}
});