var path = require('path');

function levels(str, current) {
	if(!current) {
		current = [];
	}
	if(str != '.') {
		var base = path.basename(str);
		var dir = path.dirname(str);
		current.push(base);
		return levels(dir, current);
	} else {
		return current;
	}
}

function nest(arr, obj, val) {
	if(!obj) {
		obj = { };
	}
	var dir = arr.pop();
	if(arr.length) {
		obj[dir] = nest(arr, obj[dir], val);
	} else {
		obj[dir] = val;
	}
	return obj;
}

function expand(data) {
	var paths = Object.keys(data);
	var struct = { };
	paths.forEach(function(str) {
		var arr = levels(str);
		struct = nest(arr, struct, data[str]);
	});
	return struct;
}

module.exports = expand;
