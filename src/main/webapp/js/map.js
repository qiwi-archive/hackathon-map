define('map', ['ymaps!'], function(ymaps) {
	function createMap() {
		var myProjection = new ymaps.projection.Cartesian([
				// Определяем границы области отображения в декартовых координатах.
				[-1, -1],
				[1, 1]
			]),

		// Создадим собственный слой карты:
			MyLayer = function () {
				return new ymaps.Layer(
					// Зададим функцию, преобразующую номер тайла
					// и уровень масштабировая в URL тайла на сервере.
					function (tile, zoom) {
						return "/tiles/" + zoom + "/tile-" + tile[0] + "-" + tile[1] + ".jpg";
					}
				);
			};

		// Добавим конструктор слоя в хранилище слоёв под ключом my#layer.
		ymaps.layer.storage.add('my#layer', MyLayer);
		// Создадим новый тип карты, состоящий только из нашего слоя тайлов,
		// и добавим его в хранилище типов карты под ключом my#type.
		ymaps.mapType.storage.add('my#type', new ymaps.MapType(
			'Схема',
			['my#layer']
		));

		// Создадим карту в заданной системе координат.
		myMap = new ymaps.Map('map', {
			center:[1, -1],
			zoom:7,
			type:'my#type'
		}, {
			maxZoom:10, // Максимальный коэффициент масштабирования для заданной проекции.
			minZoom:7, // Минимальный коэффициент масштабирования.
			projection:myProjection
		});

		// Добавим миникарту и кнопку изменения масштаба на нашу карту.
		myMap.controls
			.add(new ymaps.control.MiniMap({
				type:'my#type'
			}))
			.add('smallZoomControl', { right:5, top:5 });
	}

	return {
		create: createMap
	};
});