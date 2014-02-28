'use strict';
module.exports = function(grunt) {

	//Initializing the configuration object
	grunt.initConfig({
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'Gruntfile.js',
				'./httpdocs/js/pages/*.js',
			]
		},
		less: {
			dist: {
				files: {
					'/www/assets/css/styles.min.css': [
						'/www/assets/less/app.less'
					],
				},
				options: l
					compress: true,
					// LESS source map
					// To enable, set sourceMap to true and update sourceMapRootpath based on your install
					sourceMap: false,
				}
			}
		},
		uglify: {
			dist: {
				files: {
					// // MODERNIZR...
					// './httpdocs/js/compiled/modernizr.custom.min.js': [
					// 	"./httpdocs/assets/modernizr/modernizr.js",
					// 	'./httpdocs/js/modernizr-polyfills.js'
					// ],
					// // CORE...
					// './httpdocs/js/compiled/core.min.js': [
					// 	'./httpdocs/assets/jquery-legacy/jquery.js',
					// 	'./httpdocs/assets/momentjs/moment.js',
					// 	'./httpdocs/assets/momentjs/moment-timezone.js'
					// ],

				}
			}
		},
		phpunit: {
			//...
			options: {}
		},
		watch: {
			less: {
				options: {
					livereload: true
				},
				files: [
					'./httpdocs/assets/bootstrap/less/*.less',
					'./httpdocs/less/*.less',
					'./httpdocs/less/**/*.less'

				],
				tasks: ['less'],
			},
			js: {
				options: {
					livereload: true
				},
				files: '<%= jshint.all %>',
				tasks: ['uglify'],
			},
		}
	});

	// Plugin loading
	grunt.loadNpmTasks("grunt-modernizr");
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');

	// Register tasks
	grunt.registerTask('default', [
		'less',
		'uglify',
		'concat'
	]);
	grunt.registerTask('dev', [
		'watch'
	]);

};
