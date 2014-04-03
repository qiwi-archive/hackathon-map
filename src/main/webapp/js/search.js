define('search', ['base', 'api'], function(base, api) {
	return {
		query: function(string) {
			api.request('search', {query: string});
		}
	}
});