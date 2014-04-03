define('log', function() {
	// TODO cross-browser
	function log() {
		return console.log.apply(console, arguments);
	}

	return log;
});