'use strict';

/**
 * Loader (RequireJS Plugin) for Yandex Maps 2.0.
 * @ignore
 */
define({
	load: function (name, req, onload, config) {
		req([location.protocol + '//api-maps.yandex.ru/2.0/?load=package.full&lang=ru-RU'], function () {
			ymaps.ready(function() {
				onload(ymaps);
			});
		});
	}
});