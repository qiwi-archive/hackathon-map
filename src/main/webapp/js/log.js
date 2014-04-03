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

	function log() {
		// TODO cross-browser
		return console.log.apply(
			console,
			Array.prototype.concat.apply(
				[timestamp()],
				arguments
			)
		);
	}

	return log;
});