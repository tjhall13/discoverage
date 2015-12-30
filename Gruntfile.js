module.exports = function(grunt) {
	grunt.initConfig({
		jshint: {
			development: {
				src: ['Gruntfile.js', 'bin/discoverage', 'index.js', 'lib/**.js']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('default', ['jshint']);
};
