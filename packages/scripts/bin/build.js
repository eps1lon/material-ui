#!/usr/bin/env node
const program = require('commander');
const path = require('path');
const { build, buildFull, buildRollup } = require('../src/build');
const copyFiles = require('../src/copy-files');

program
  .version(require('../package.json').version)
  .option('-c, --copy-files', 'copy files only')
  .option('-f, --full', 'complete build pipeline')
  .option('-t, --targets <target>', 'Target', arg => arg.split(','))
  .option('-r, --rollup <configPath>', 'Executes rollup with the given config')
  .parse(process.argv);

if (program.full) {
  buildFull(program.targets, { rollupConfig: program.rollup });
} else if (program.targets) {
  program.targets.map(build);
} else if (program.rollup) {
  buildRollup(path.join(process.cwd(), program.rollup));
} else if (program.copyFiles) {
  copyFiles();
} else {
  throw new Error(program.usage());
}
