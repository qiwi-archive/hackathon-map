define(
	'ui',
	[
		'base',
		'log',
		'widgets/add',
		'widgets/floor',
		'widgets/search',
		'widgets/zoom'
		//'widgets/filter'
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
			var controls = map.controls;

			base.each(this.widgets, function(widget) {
				try {
					log('ui', 'widget', widget.name);
					var data = widget.init();
					controls.add(data.control, data.options);
				} catch (e) {
					throw(['widget broken', e])
				}
			})
		}
	}
});