define('widgets/zoom', ['ui'], function() {
	return {
		name: 'zoom',

		init: function() {
			return new ymaps.control.ZoomControl({
				customTips: [
					{
						index: 7,
						value: "Мелко"
					},
					{
						index: 10,
						value: "Крупно"
					}
				]
			});
		}
	}
});