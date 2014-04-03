define('widgets/zoomcontrol', ['ui'], function() {
	return {
		name: 'zoomcontrol',

		init: function() {
			return new ymaps.control.ZoomControl({
				customTips: [
					{ index: 7, value: "Мелко" },
			        { index: 10, value: "Крупно" }
				],
				right:5,
				top:5
			});
		}
	}
});