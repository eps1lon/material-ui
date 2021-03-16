const playwright = require('playwright');
const webpack = require('webpack');

const CI = Boolean(process.env.CI);

let build = `material-ui local ${new Date().toISOString()}`;

if (process.env.CIRCLE_BUILD_URL) {
  build = process.env.CIRCLE_BUILD_URL;
}

const browserStack = {
  username: process.env.BROWSERSTACK_USERNAME,
  accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
  build,
  // https://github.com/browserstack/api#timeout300
  timeout: 5.5 * 60, // Maximum time before a worker is terminated. Default 5 minutes.
};

process.env.CHROME_BIN = playwright.chromium.executablePath();

module.exports = function setKarmaConfig(karmaConfig) {
  const config = {
    basePath: '../',
    browsers: ['chromeHeadless'],
    frameworks: ['mocha', 'webpack'],
    files: [{ pattern: 'test/karma.tests.js', watched: false }],
    plugins: ['karma-mocha', 'karma-chrome-launcher', 'karma-sourcemap-loader', 'karma-webpack'],
    /**
     * possible values:
     * - config.LOG_DISABLE
     * - config.LOG_ERROR
     * - config.LOG_WARN
     * - config.LOG_INFO
     * - config.LOG_DEBUG
     */
    logLevel: karmaConfig.LOG_INFO,
    port: 9876,
    preprocessors: {
      'test/karma.tests.js': ['webpack', 'sourcemap'],
    },
    proxies: {
      '/fake.png': '/base/test/assets/fake.png',
      '/fake2.png': '/base/test/assets/fake2.png',
    },
    reporters: ['dots'],
    webpack: {
      devtool: CI ? 'inline-source-map' : 'eval-source-map',
      module: {
        rules: [
          {
            test: /\.(js|ts|tsx)$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            options: {
              envName: 'test',
            },
          },
        ],
      },
      resolve: {
        extensions: ['.js', '.ts', '.tsx'],
        fallback: {
          // Some tests import fs
          fs: false,
          // required by source-map-support
          path: require.resolve('path-browserify'),
          // required by e.g. styled-components
          stream: false,
        },
      },
    },
    webpackMiddleware: {
      noInfo: true,
      writeToDisk: CI,
    },
    customLaunchers: {
      chromeHeadless: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox'],
      },
    },
  };

  karmaConfig.set(config);
};
