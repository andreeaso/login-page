const path = require('path')

module.exports = function (config) {
  config.set({
    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera (has to be installed with `npm install karma-opera-launcher`)
    // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
    // - PhantomJS
    // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
    browsers: ['jsdom'],

    frameworks: ['mocha', 'sinon'],

    // Point karma at the tests.webpack.js
    files: [
      'tests.webpack.js',
    ],

    // Run karma through preprocessor plugins
    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ],
    },

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true,

    // How long will Karma wait for a message from a browser before disconnecting
    // from it (in ms).
    browserNoActivityTimeout: 30000,

    webpack: {
      devtool: 'inline-source-map',
      context: path.join(__dirname, 'app'),
      module: {
        loaders: [
          {
            test: /\.jsx?$/,
            loader: 'babel-loader',
            exclude:  path.join(__dirname, 'node_modules'),
            query: {
              presets: ['es2015', 'react', 'stage-0', 'es3', 'es2015-mod'],
              plugins: ['syntax-object-rest-spread']
            }
          },
          { test: /\.json$/, loader: 'json-loader' },
          { test: /\.css$/, loader: 'null-loader' },
        ],
      },
      externals: {
        'cheerio': 'window',
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
      },
      resolve: {
        extensions: ['.js', '.jsx', '.css'],
        modules: [ 'app', 'node_modules' ],
      },
      node: {
        fs: 'empty',
      },
      watch: true,
    },

    webpackMiddleware: {
        // webpack-dev-middleware configuration
      noInfo: true,
    },

    webpackServer: {
      noInfo: true, // Do not spam the console when running in karma
    },

    plugins: [
      'karma-jsdom-launcher',
      'karma-mocha',
      'karma-sinon',
      'karma-mocha-reporter',
      'karma-sourcemap-loader',
      'karma-webpack',
    ],

    jsdomLauncher: {
      jsdom: {
        beforeParse: function(window) {
          window.localStorage = {
            getItem: function() {
              return {}
            },
            setItem: function() {

            }
          }
        }
      }
    },

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage',
    // 'mocha' (added in plugins)
    reporters: ['mocha'],

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
  })
}
