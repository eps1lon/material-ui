const childProcess = require('child_process');
const fse = require('fs-extra');
const path = require('path');
const rimraf = require('rimraf');
const { promisify } = require('util');
const copyFiles = require('./copy-files');

const exec = promisify(childProcess.exec);
const rimrafPromised = promisify(rimraf);

/**
 * exec babel command for internal package structure
 * @param {object} options
 */
function babelBuild(options = {}) {
  const defaultConfigFilePath = path.join(__dirname, '../config/babel.config.js');
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

  /* return new Promise((resolve, reject) => {
    child.on('message', () => {
      console.log('message');
    });

    child.on('error', err => reject(err));
    child.on('exit', code => resolve(code));
  }); */
}

const targetOptions = {
  es2015: {
    input: './src',
    output: '--out-dir ./build',
  },
  es2015modules: {
    babelEnv: 'modules',
    input: './src/index.js',
    output: '--out-file ./build/index.es.js',
  },
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
function build(target) {
  const options = targetOptions[target];
  if (options == null) {
    throw new Error(
      `Unrecognized target '${target}'. Choose from ${Object.keys(targetOptions).join(', ')}.`,
    );
  }

  return babelBuild(options);
}

async function buildRollup(configFilePath) {
  const configExists = await fse.exists(configFilePath);
  if (!configExists) {
    throw new Error(`Rollup config not found at ${configFilePath}`);
  }

  const command = `rollup -c ${configFilePath}`;

  return exec(command, {
    env: { BABEL_ENV: 'production-umd', NODE_ENV: 'production', PATH: process.env.PATH },
  });
}

/**
 * complete build pipeline (targets + copy-files)
 */
async function buildFull(targets, options = {}) {
  const { rollupConfig } = options;
  function rollupBuild() {
    if (rollupConfig == null) {
      return Promise.resolve();
    }
    return buildRollup(rollupConfig);
  }

  console.log('Clean build');
  await rimrafPromised('build');

  const builds = await Promise.all([
    ...targets.map(target => {
      console.log(`Building ${target}...`);
      return build(target).then(() => console.log(`Built ${target}`));
    }),
    rollupBuild(),
  ]);

  console.log(`Built ${builds.length} targets`);

  console.log('Copying files...');
  await copyFiles();
}

module.exports = { build, buildFull, buildRollup };
