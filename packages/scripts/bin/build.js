#!/usr/bin/env node
const program = require('commander');
const path = require('path');
const { buildRollup, buildTargets, copyFiles, fullBuild } = require('../src/tasks');

program
  .version(require('../package.json').version)
  .option('-c, --copy-files', 'copy files only')
  .option('-f, --full', 'complete build pipeline')
  .option('-t, --targets <target>', 'Target', arg => arg.split(','))
  .option('-r, --rollup <configPath>', 'Executes rollup with the given config')
  .parse(process.argv);

// mocked Listr
let task = {
  run: () => Promise.reject(new Error(program.usage())),
};

if (program.full) {
  task = fullBuild(program.targets, { rollupConfig: program.rollup });
} else if (program.targets) {
  task = buildTargets(program.targets);
} else if (program.rollup) {
  task = buildRollup(path.join(process.cwd(), program.rollup));
} else if (program.copyFiles) {
  task = copyFiles();
}

task.run().catch(err => {
  console.error(err);
  process.exit(1);
});
