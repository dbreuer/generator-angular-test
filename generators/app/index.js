'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require("path");
var htmlwiring = require('html-wiring');


module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = JSON.parse(htmlwiring.readFileAsString(path.join(process.cwd(), 'package.json')));
  },
  constructor: function () {
    yeoman.Base.apply(this, arguments);

    this.argument('testName', {type: String, required: false, defaults: 'frontend_unit'});
    this.option('path', {type: String, defaults: './'});
    this.option('protractor', {type: Boolean, defaults: true});
    this.option('protractorConfig', {type: Boolean, defaults: true});
  },

  prompting: function () {
    var done = this.async();
    var d = new Date();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the best ' + chalk.blue('Angular Test') + ' generator!'
    ));

    this.default = {
      moduleName: this.pkg.name,
      username: this.user.git.name(),
      dateTime: d.toLocaleString(),
      isAngular: false,
      nodeModulesPath: '../../../../../../themes/bootstrap_aat/node_modules',
      bowerComponentsPath: '../../../../themes/bootstrap_aat/bower_components',
      protractor: {
        seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
        localAddress: 'http://aat.local/'
      },
      karma: {
        base_path: '../../',
        frameworks: 'jasmine',
        files: [
          '/angular/angular.js',
          '/angular-mocks/angular-mocks.js'
        ],
        reporters: ['progress','dots','coverage','junit'],
        port: 9999,
        preProcessor: 'js/*.js'
      }
    };

    //@todo: collect all files dependencies from module
    // = function(){
    //  JSON.stringify(this.default.files);
    //};

    var prompts = [
      {
      type: 'input',
      name: 'default.username',
      message: 'What is your name?',
      default: this.default.username
      },
      {
      type: 'input',
      name: 'default.seleniumAddress',
      message: 'What is your selenium address?',
      default: this.default.protractor.seleniumAddress
      },
      {
      type: 'input',
      name: 'default.localAddress',
      message: 'What is your local address?',
      default: this.default.protractor.localAddress
      },
      {
        type: 'input',
        name: 'currentPath',
        message: 'Where is your script folder?',
        default: process.cwd()
      }
    ];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: function () {

    var testName = this.testName;
    var testFilePath = path.join(this.options.path, testName + '.js');

    var tplFile = '_base_unit.js';
    if (this.options.karmaConfig) {
      tplFile = '_karma_config.js';
    }
    if (this.options.protractor) {
      tplFile = '_base_e2e.js'
    }
    if (this.options.protractorConfig) {
      tplFile = '_protractor_config.js';
    }


      var context = this.default;

      this.template("_base_e2e.js", "e2e/test.e2e.js", context);
      this.template("_base_unit.js", "unit/test.spec.js", context);
      this.template("_karma_config.js", "karma.config.js", context);
      this.template("_protractor_config.js", "protractor.config.js", context);


  }

  //install: function () {
  //  this.installDependencies();
  //}
});
