'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var RespFlatfileGenerator = yeoman.generators.Base.extend({
	init: function () {
		this.pkg = yeoman.file.readJSON(path.join(__dirname, '../package.json'));

		this.on('end', function () {
			if (!this.options['skip-install']) {
				this.npmInstall();
				this.bowerInstall();
			}
		});

	},

	askFor: function () {
	var done = this.async();

	// have Yeoman greet the user
	//console.log(this.yeoman);

	// replace it with a short and sweet description of your generator
	console.log(chalk.magenta('Response:  Create a flatfile website.'));

	var prompts = [
		{
			name: "jobName",
			message: "What would you like to call this project?",
		},
		{
			name: "author",
			message: "What is the authors (your) name?",
			default: "Marc Broad"
		},
		{
			name: "authorEmail",
			message: "What is your email?",
			default: "mbroad@thepowertoprovoke.com"
		},
		{
			type: "confirm",
			name: "jqueryLegacy",
			message: "Do you need IE8 support for jQuery?",
			default: false
		},
		{
			name: "bowerDir",
			message: "What directory would you like bower to install components to?",
			default: "vendor"
		},
	];

	this.prompt(prompts, function (props) {
		this.jobName = props.jobName;
		this.author = props.author;
		this.authorEmail = props.authorEmail;
		this.jqueryVersion = "~2.1.0";
		this.bowerDir = props.bowerDir;

		if (props.jqueryLegacy){
			this.jqueryVersion = "1.9.0";
		}

	 	done();
	}.bind(this));
	},

	app: function () {
		this.mkdir('www');

		this.mkdir('www/assets');
		this.mkdir('www/assets/js');
		this.mkdir('www/assets/css');
		this.mkdir('www/assets/img');
		this.mkdir('www/assets/less');
		this.mkdir('www/assets/fonts');

		this.template('index.html', 'www/index.html');


		this.template('_index.md', 'index.md');
		//this.template('Gruntfile.js', 'Gruntfile.js');
		//this.template('index.html', 'index.html');
		this.template('_bowerrc', '.bowerrc');
		this.template('_bower.json', 'bower.json');

		this.template('_package.json', 'package.json');


	},

	projectfiles: function () {
		this.copy('editorconfig', '.editorconfig');
		this.copy('jshintrc', '.jshintrc');
	},

	runtime: function (){
		this.copy('gitignore', '.gitignore');
	}


});

module.exports = RespFlatfileGenerator;
