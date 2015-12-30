var express = require('express');
var util = require('util');
var path = require('path');
var HttpError = require('./lib/error.js');

require('cafescript');
var index = require('./theme/cafe/index.cafe');
var stats = require('./theme/cafe/stats.cafe');

module.exports = function(ctx) {
	var app = express();

	app.use(express.static(path.resolve(__dirname, 'theme/')));
	app.use(/\/((?:[^\/]+\/?)+)/,
		function(req, res, next) {
			var path = req.params[0].split('/');
			try {
				var data = path.reduce(function(current, entry, index, array) {
					if(entry === '') {
						return current;
					} else {
						var value = current[entry];
						if(value) {
							if(!Array.isArray(value) && index == array.length - 1) {
								throw new HttpError(302, req.originalUrl + '/');
							} else {
								return value;
							}
						} else {
							throw new HttpError(404);
						}
					}
				}, ctx.lcov);
				req.lcov = {
					name: ctx.name,
					path: req.params[0],
					data: data,
					code: ctx.code[req.params[0]]
				};
				next();
			} catch(err) {
				next(err);
			}
		},
		stats.middleware
	);
	app.use('/',
		function(req, res, next) {
			req.lcov = {
				name: ctx.name,
				data: ctx.lcov
			};
			next();
		},
		index.middleware
	);

	app.use(function(err, req, res, next) {
		if(err.code) {
			switch(err.code) {
				case 301:
				case 302:
					res.redirect(err.code, err.url);
					break;
				case 404:
					res.status(err.code).send('Error: 404 Not Found');
					break;
// TODO:		case 500:
				default:
					res.status(err.code).send(err.msg);
					console.error(err.msg);
					break;
			}
		} else {
			console.error(err.stack);
			res.write('Error: 500');
		}
		res.end();
	});
	return app;
};
