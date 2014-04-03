/**
 * Simple console logger.
 * @class log
 * @singleton
 */
define('log', function() {
	'use strict';

	function timestamp() {
		return new Date().toISOString().substr(11, 12);
	}

	function write(type, args) {
		// TODO test cross-browser
		return console[type].apply(
			console,
			Array.prototype.concat.apply(
				[timestamp()],
				args
			)
		);
	}

	function log() {
		write('log', arguments);
	}

	log.debug = function() {
		write('debug', arguments);
	};
	log.log = function() {
		write('log', arguments);
	};
	log.info = function() {
		write('info', arguments);
	};
	log.warn = function() {
		write('warn', arguments);
	};
	log.error = function() {
		write('error', arguments);
	};

	return log;
});