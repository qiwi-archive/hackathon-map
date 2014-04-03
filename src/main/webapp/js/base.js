define('base', ['underscore'], function(underscore) {
	var base = underscore;

	/**
	 * Turns passed Arguments object into array with optional slice.
	 * @member base
	 * @param {Array} array
	 * @param {Number} [slice]
	 * @return {Array}
	 */
	base.args = function(array, slice) {
		return Array.prototype.slice.call(array, slice|0);
	}

	/**
	 * Calls function with scope and any arguments.
	 * @member base
	 * @param {Function} fn
	 * @param {Mixed} scope
	 * @return {Mixed}
	 */
	base.call = function(fn, scope) {
		return base.isFunction(fn) ?
			fn.apply(scope, args(arguments, 2)) :
			undefined;
	}

	/**
	 * Applies function with scope and arguments.
	 * @member base
	 * @param {Function} fn
	 * @param {Mixed} scope
	 * @param {Array} arguments
	 * @return {Mixed}
	 */
	base.apply = function(fn, scope, args) {
		return base.isFunction(fn) ?
			fn.apply(scope, args) :
			undefined;
	}

	return base;
})