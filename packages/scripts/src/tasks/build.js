const Listr = require('listr');
const rimraf = require('rimraf');
const { promisify } = require('util');
const copyFiles = require('./copy-files');
const build = require('../build');

const rimrafPromised = promisify(rimraf);

/**
 * complete build pipeline (targets + copy-files)
 */
function fullBuild(targets, options = {}) {
  const { rollupConfig } = options;

  const buildTasks = targets.map(target => {
    return { title: target, task: () => build.single(target) };
  });

  if (rollupConfig != null) {
    buildTasks.push({ title: 'rollup', task: () => build.rollup(rollupConfig) });
  }

  return new Listr(
    [
      { title: 'Cleaning build', task: () => rimrafPromised('build') },
      {
        title: 'Building targets',
        task: () => {
          return new Listr(buildTasks, { concurrent: true });
        },
      },
      { title: 'copy files', task: () => copyFiles() },
    ],
    { collapse: false },
  );
}

function buildRollup(config) {
  return new Listr([{ title: 'Build with rollup', task: () => build.rollup(config) }]);
}

function buildTargets(targets) {
  return new Listr(
    [
      {
        title: 'Build targets',
        task: () =>
          new Listr(
            targets.map(target => {
              return { title: target, task: () => build.single(target) };
            }),
            { concurrent: true },
          ),
      },
    ],
    { collapse: false },
  );
}

module.exports = { buildRollup, buildTargets, fullBuild };
