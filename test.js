/* global it */

'use strict';

var assert = require('assert');
var createErrorClass = require('./');

var CustomError = createErrorClass('CustomError');

it('should work', function () {
	function doSomethingBad() {
		throw new CustomError('It went bad!', {extra: 42});
	}

	try {
		doSomethingBad();
	} catch (err) {
		assert(err.name === 'CustomError', 'The name property should be set to the errors name');
		assert(err instanceof CustomError, 'The error should be an instance of its class');
		assert(err instanceof Error, 'The error should be an instance of builtin Error');
		assert(require('util').isError(err), 'The error should be recognized by Node.js util#isError');
		assert(err.stack, 'The error should have recorded a stack');
		assert.strictEqual(err.toString(), 'CustomError: It went bad!', 'toString should return the default error message formatting');
		assert.strictEqual(err.stack.split('\n')[0], 'CustomError: It went bad!', 'The stack should start with the default error message formatting');
		assert.strictEqual(err.stack.split('\n')[1].indexOf('doSomethingBad'), 7, 'The first stack frame should be the function where the error was thrown.');
		assert.strictEqual(err.extra, 42, 'The extra property should have been set');
	}
});

it('should have optional message', function () {
	try {
		throw new CustomError();
	} catch (err) {
		assert(err.name === 'CustomError');
	}

	try {
		throw new CustomError({message: 'wow'});
	} catch (err) {
		assert(err.message === 'wow');
	}
});

it('should have constructor callback', function () {
	var HTTPError = createErrorClass('NotFoundError', function () {
		this.message = 'Status code is ' + this.statusCode;
	});

	try {
		throw new HTTPError({statusCode: 404});
	} catch (err) {
		assert(err.message === 'Status code is 404');
		assert(err.statusCode === 404);
	}
});
