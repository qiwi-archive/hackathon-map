define('search', ['base', 'api'], function(base, api) {
	return {
		query: function(string) {
			api.read('search', {query: string});
		}
	}
});