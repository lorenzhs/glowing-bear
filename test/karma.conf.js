module.exports = function (config) {
  config.set({

    basePath: '../',

    files: [
      'node_modules/linkifyjs/dist/linkify.js',
      'node_modules/linkifyjs/dist/linkify-string.js',
      'test/unit/main.test.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome', 'ChromeHeadless', 'ChromeHeadlessNoSandbox'],

    singleRun: true,

    plugins: [
      'karma-chrome-launcher',
      'karma-jasmine',
      'karma-junit-reporter',
      'karma-esbuild'
    ],

    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },

    esbuild: {
        // TODO figure out what to put here to fix plugin tests
        bundle: true,
        sourcemap: true
    },

    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    },

    preprocessors: {
      './test/unit/*.js': ['esbuild'],
      './src/**/*.js': ['esbuild']
    },
  });

  if(process.env.TRAVIS){
    config.browsers = ['ChromeHeadlessNoSandbox'];
  }
};
