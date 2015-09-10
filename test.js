/* global it */

'use strict';

var assert = require('assert');
var createErrorClass = require('./');

var CustomError = createErrorClass('CustomError', function (message) {
	this.message = message;
});

it('should work', function () {
	function doSomethingBad() {
		throw new CustomError('It went bad!');
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
	}
});

it('should throw on invalid className', function () {
	assert.throws(function () {
		createErrorClass('something(){}); console.error("Run, you fools!"); (function myError');
	}, /className contains invalid characters/);
});

it('should capture a message if setup is not defined', function () {
	var NoSetupError = createErrorClass('NoSetupError');

	try {
		throw new NoSetupError('Oh noes!');
	} catch (err) {
		assert.strictEqual(err.message, 'Oh noes!');
	}
});
