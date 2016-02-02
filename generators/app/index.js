'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require("path");
var del = require("del");
var fs = require("fs");
var htmlwiring = require('html-wiring');
var inquirer = require("inquirer");
var extend = require('extend');


var logWrite = function (message){
  var dt = new Date();
  message = dt + ' '+ message;
  fs.writeFile('angular-test-log.txt', message);
};

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    var directory = path.dirname(module.parent.filename);
    var parent = path.resolve(directory, '..');
    this.pkg = {
      name: 'noname',
      parent: parent
    };

    var filename = path.join(process.cwd(), 'package.json')
    fs.stat(filename, function(err, stat) {
      // do something
      if(err == null) {
        console.log('File exists');
        this.pkg = JSON.parse(htmlwiring.readFileAsString(filename));
      } else if(err.code == 'ENOENT') {
        logWrite('There is no package file for test!');
      } else {
        console.log('Some other error: ', err.code);
      }

    });

  },
  constructor: function () {
    yeoman.Base.apply(this, arguments);

    this.argument('testName', {type: String, required: false, defaults: 'frontend_unit'});
    this.option('path', {type: String, defaults: './'});
    this.option('protractor', {type: Boolean, defaults: true});
    this.option('protractorConfig', {type: Boolean, defaults: true});
    this.option('fast', {type: Boolean, defaults: false});
    this.option('clean', {type: Boolean, defaults: false});
    this.option('cleanDry', {type: Boolean, defaults: false});
    this.option('clearAll', {type: Boolean, defaults: false});
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
      seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
      localAddress: 'http://aat.local/',
      base_path: '../../',
      frameworks: 'jasmine',
      files: [
        '/angular/angular.js',
        '/angular-mocks/angular-mocks.js'
      ],
      reporters: ['progress','dots','coverage','junit'],
      port: 9999,
      preProcessor: 'js/*.js'

    };

    //@todo: collect all files dependencies from module
    // = function(){
    //  JSON.stringify(this.default.files);
    //};
    var prompt;


    if (!this.options.fast) {
      prompt = [
        {
          type: 'input',
          name: 'username',
          message: 'What is your name?',
          default: this.default.username
        },
        {
          type: 'input',
          name: 'seleniumAddress',
          message: 'What is your selenium address?',
          default: this.default.seleniumAddress
        },
        {
          type: 'input',
          name: 'localAddress',
          message: 'What is your local address?',
          default: this.default.localAddress
        },
        {
          type: 'input',
          name: 'currentPath',
          message: 'Where is your script folder?',
          default: process.cwd()
        },
        {
          type: 'input',
          name: 'nodeModulesPath',
          message: 'Where is your node modules folder?',
          default: this.default.nodeModulesPath
        },
        {
          type: 'input',
          name: 'bowerComponentsPath',
          message: 'Where is your bower components folder?',
          default: this.default.bowerComponentsPath
        }
      ];

    } else {
      this.log('FastRun!');
      done();
    }

    if (this.options.clearAll) {
      prompt = [{
        name: 'deleteAll',
        type: 'confirm',
        message: 'Are you sure?'
      }, {
        when: function (response) {
          return response.deleteAll;
        },
        name: 'deleteAll2',
        message: 'Are you sure you want to DELETE all test files?'
      }];
    }

    inquirer.prompt(prompt, function (props) {
      this.props = props;
      done();
    }.bind(this));
  },

  writing: function () {
    if (this.props.deleteAll && this.props.deleteAll2 && this.options.clearAll) {
        del.sync(['test/**/*']);
        del.sync(['results/**/*']);
        del.sync(['results']);
        del.sync(['coverage/**/*']);
        del.sync(['coverage']);
        del.sync(['./.gitignore']);
        del.sync(['test']);
        this.log(chalk.red('Deleted ALL test files!'));
      return;
    }

    if (this.options.clearAll) {
      this.log(chalk.red('It was very close!!!'));
      return;
    }
      var testName = this.testName;

      if (this.options.clean) {
        del.sync(['test/**/*']);
        del.sync(['results/**/*']);
        del.sync(['results']);
        del.sync(['coverage/**/*']);
        del.sync(['coverage']);
        del.sync(['.gitignore']);
        this.log('Deleted test folder files!');
      }
      if (this.options.cleanDry) {
        del.sync(['test/**.*'], {dryRun: true});
        del.sync(['test/**/*'], {dryRun: true});
        del.sync(['results/**/*'], {dryRun: true});
        del.sync(['results'], {dryRun: true});
        del.sync(['coverage/**/*'], {dryRun: true});
        del.sync(['coverage'], {dryRun: true});
        del.sync(['.gitignore'], {dryRun: true});
      }

      var context = {};
      extend(context, this.default, this.props);

      ////Unit test files
      this.template("_base_unit.js", "test/frontend/unit/test.spec.js", context);
      this.template("_karma_config.js", "test/frontend/" + testName + "_karma.conf.js", context);

      //E2E (protractor/cucumberjs) files
      this.template("_base.feature", "test/frontend/e2e/features/" + testName + ".feature", context);
      this.template("_protractor_config.js", "test/frontend/" + testName + "_protractor.conf.js", context);
      this.template("_PageObject.js", "test/frontend/e2e/support/PageObject.js", context);
      this.template("_stepDefinitions.js", "test/frontend/e2e/support/stepDefinitions.js", context);
      this.template("_environment.js", "test/frontend/environment.js", context);
      this.template("_gitignore", "test/.gitignore");

      //@todo: add depencency
      // NPM @ cucumber 0.9.4
      // NPM @ protractor-cucumber-framework

  }

  //install: function () {
  //  this.installDependencies();
  //}
});
