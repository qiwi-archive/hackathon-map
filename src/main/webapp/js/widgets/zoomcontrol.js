define('widgets/zoomcontrol', ['ui'], function() {
	return {
		name: 'zoomcontrol',

		init: function() {
			return new ymaps.control.ZoomControl({
				customTips: [
					{ index: 1, value: "Мелко" },
			        { index: 2, value: "Средне" },
			        { index: 3, value: "Крупно" },
			        { index: 4, value: "Слишком крупно" }
				],
				right:5,
				top:5
			});
		}
	}
});