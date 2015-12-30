var util = require('util');

function HttpError(code, data) {
	this.code = code;
	switch(code) {
		case 301:
		case 302:
			this.url = data;
			break;
		default:
			this.msg = 'Error';
	}
}
util.inherits(HttpError, Error);

module.exports = HttpError;
