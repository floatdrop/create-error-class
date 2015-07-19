'use strict';

var util = require('util');
var objectAssign = require('object-assign');

module.exports = function createErrorClass(className, constructor) {
	if (typeof className !== 'string') {
		throw new TypeError('Expected className to be a string');
	}

	constructor = constructor || function () {};

	function CustomError(message, props) {
		Error.captureStackTrace(this, this.constructor);
		this.name = className;

		if (typeof message !== 'string') {
			props = message;
			message = undefined;
		}

		this.message = message;
		objectAssign(this, props);
		constructor.call(this);
	}

	util.inherits(CustomError, Error);

	return CustomError;
};
