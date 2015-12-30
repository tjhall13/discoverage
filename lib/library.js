var path = require('path');
var fs = require('fs');

module.exports = {
	getFilesSync: function(files, base) {
		var data = { };
		files.forEach(function(filename) {
			var file = '';
			try {
				file = fs.readFileSync(path.resolve(base, filename), 'utf8');
			} catch(err) {
				if(err.code == 'ENOENT') {
					throw new Error('File: ' + filename + ' cannot be found.');
				} else {
					throw err;
				}
			} finally {
				data[filename] = file;
			}
		});
		return data;
	},
	getFiles: function(files, base, callback) {
		callback(null, new Error('Function Not Available'));
	}
};
