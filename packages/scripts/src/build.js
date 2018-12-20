const childProcess = require('child_process');
const fse = require('fs-extra');
const path = require('path');
const { promisify } = require('util');

const exec = promisify(childProcess.exec);

/**
 * exec babel command for internal package structure
 * @param {object} options
 */
function babelBuild(options = {}) {
  const defaultConfigFilePath = path.join(__dirname, '../config/babel.js');
  const {
    babelEnv,
    configFilePath = defaultConfigFilePath,
    ignore = '"*.test.js"',
    input,
    output,
  } = options;

  const command = `babel --config-file ${configFilePath} ${input} ${output} --ignore ${ignore}`;

  return exec(command, {
    env: { BABEL_ENV: babelEnv, NODE_ENV: 'production', PATH: process.env.PATH },
  });
}

const targetOptions = {
  /**
   * production build with commonJS modules
   */
  cjs: {
    input: './src',
    output: '--out-dir ./build',
  },
  /**
   * production build with ES modules
   */
  esm: {
    babelEnv: 'modules',
    input: './src/index.js',
    output: '--out-file ./build/index.esm.js',
  },
  /**
   * production build targeted at "evergreen" browsers
   */
  es: {
    babelEnv: 'es',
    input: './src',
    output: '--out-dir ./build/es',
  },
};

/**
 * Build for a single target
 * @param {string} target
 */
function single(target) {
  const options = targetOptions[target];
  if (options == null) {
    throw new Error(
      `Unrecognized target '${target}'. Choose from ${Object.keys(targetOptions).join(', ')}.`,
    );
  }

  return babelBuild(options);
}

async function rollup(configFilePath) {
  const configExists = await fse.exists(configFilePath);
  if (!configExists) {
    throw new Error(`Rollup config not found at ${configFilePath}`);
  }

  const command = `rollup -c ${configFilePath}`;

  return exec(command, {
    env: { BABEL_ENV: 'production-umd', NODE_ENV: 'production', PATH: process.env.PATH },
  });
}

module.exports = { rollup, single };
