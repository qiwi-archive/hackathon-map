require.config({
	baseUrl: 'js',
	paths: {
		jquery: 'lib/jquery-1.11.0',
		ymaps: '//api-maps.yandex.ru/2.0/?load=package.full&lang=ru-RU',
		underscore: 'lib/underscore'
	},
	shim: {
		jquery: {
			exports: '$'
		},
		ymaps: {
			exports: 'ymaps'
		},
		underscore: {
			exports: '_'
		}
	},
	deps: ['map']
});