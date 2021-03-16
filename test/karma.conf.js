const playwright = require('playwright');

process.env.CHROME_BIN = playwright.chromium.executablePath();

module.exports = function setKarmaConfig(karmaConfig) {
  const config = {
    basePath: '../',
    browsers: ['chromeHeadless'],
    frameworks: ['mocha', 'webpack'],
    files: [{ pattern: 'test/karma.tests.js', watched: false }],
    plugins: ['karma-mocha', 'karma-chrome-launcher', 'karma-webpack'],
    preprocessors: {
      'test/karma.tests.js': ['webpack'],
    },
    webpack: {
      // module: {
      //   rules: [
      //     {
      //       test: /\.(js|ts|tsx)$/,
      //       loader: 'babel-loader',
      //       exclude: /node_modules/,
      //       options: {
      //         envName: 'test',
      //       },
      //     },
      //   ],
      // },
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
