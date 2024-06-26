// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
	config.set({
		basePath: '',
		frameworks: ['jasmine', '@angular-devkit/build-angular'],
		plugins: [
			require('karma-jasmine'),
			require('karma-chrome-launcher'),
			require('karma-jasmine-html-reporter'),
			require('karma-coverage'),
			require('@angular-devkit/build-angular/plugins/karma'),
			'karma-spec-reporter',
		],
		files: [{ pattern: 'src/**/*.spec.ts', type: 'js' }],
		logLevel: config.LOG_INFO,
		client: {
			jasmine: {
				// you can add configuration options for Jasmine here
				// the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
				// for example, you can disable the random execution with `random: false`
				// or set a specific seed with `seed: 4321`
			},
			clearContext: false, // leave Jasmine Spec Runner output visible in browser
		},
		jasmineHtmlReporter: {
			suppressAll: true, // removes the duplicated traces
		},
		coverageReporter: {
			dir: require('path').join(__dirname, './coverage/angular-chart'),
			subdir: '.',
			reporters: [{ type: 'html' }, { type: 'text-summary' }, { type: 'lcovonly' }],
		},
		browsers: ['ChromeHeadlessNoSandbox'],
		reporters: ['spec', 'kjhtml'],
		restartOnFileChange: true,
		singleRun: true,
		skipFileWithNoCoverage: false,
		customLaunchers: {
			ChromeHeadlessNoSandbox: {
				base: 'ChromeHeadless',
				flags: ['--no-sandbox'],
			},
		},
	});
};
