'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({

    constructor: function () {
        yeoman.generators.Base.apply(this, arguments);

        this.argument('applicationType', { type: String, required: false, desc: 'the project type to create' });
        this.argument('applicationName', { type: String, required: false, desc: 'the name of the application' });
    },

    init: function () {
        this.log(yosay('Hanssens\' Flavored Generators: \r\nThese go to ' + chalk.red('eleven')));
        this.templatedata = {};
    },

    askForType: function () {
        
        // TODO: Validate project type, if provided through a startup argument
        
        if (!this.type) {
            var done = this.async();

            var prompts = [{
                type: 'list',
                name: 'type',
                message: 'What type of project would you like to create?',
                choices: [
                    {
                        name: 'Angular 2 + Typescript',
                        value: 'ng2ts'
                    }, {
                        name: 'Surprise me!',
                        value: 'surprise'
                    }
                ]
            }];
            
            this.prompt(prompts, function (selectedChoice) {
                this.applicationType = selectedChoice.type;
                done();
            }.bind(this));
        }
    },
    
    askForName: function () {
        if (!this.applicationName) {
            var done = this.async();
            
            var prompts = [{
                name: 'applicationName',
                message: 'What\'s the name of your application?',
                default: this.applicationType + 'App'
            }];

            this.prompt(prompts, function (props) {
                this.applicationName = props.applicationName;
                done();
            }.bind(this));          
        }

    },

    install: function () {
        // doesn't actually *do* anything yet, only spits out config
        console.log('Project type\t', this.applicationType);
        console.log('Project name\t', this.applicationName);
    }
});
