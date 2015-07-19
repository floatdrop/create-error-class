# create-error-class [![Build Status](https://travis-ci.org/floatdrop/create-error-class.svg?branch=master)](https://travis-ci.org/floatdrop/create-error-class)

> Create error class


## Install

```
$ npm install --save create-error-class
```


## Usage

```js
var createErrorClass = require('create-error-class');

var HTTPError = createErrorClass('HTTPError', function () {
	this.message = 'Status code is ' + this.statusCode;
});

throw new HTTPError({statusCode: 404});
```


## API

### createErrorClass(className, [constructor])

Return constructor of Errors with `className`. Constructor accepts optional message and props, that will be assigned to Error.

#### className

*Required*  
Type: `string`

Class name of Error Object.

#### constructor
Type: `function`

Function, that will be called after each Error object is created from constructor with context of Error object.

## License

MIT © [Vsevolod Strukchinsky](http://github.com/floatdrop)
