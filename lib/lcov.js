var fs = require('fs');

var lcov = {
	parse: function(data) {
		var lines = data.split('\n');
		data = { };

		var name;
		var file = [];
		lines.forEach(function(line) {
			var params = line.split(':');
			switch(params[0].trim()) {
				case 'SF':
					name = params[1].trim();
					break;
				case 'DA':
					params = params[1].split(',');
					file.push({
						lineno: params[0].trim(),
						hits: params[1].trim()
					});
					break;
				case 'end_of_record':
					data[name] = file;
					file = [];
					break;
			}
		});
		return data;
	},
	readFile: function(file, callback) {
		fs.readFile(file, 'utf8', function(err, data) {
			if(err) {
				callback(err, null);
			} else {
				callback(null, lcov.parse(data));
			}
		});
	},
	readFileSync: function(file) {
		return lcov.parse(fs.readFileSync(file, 'utf8'));
	}
};

module.exports = lcov;
