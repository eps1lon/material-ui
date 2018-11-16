#!/usr/bin/env node
const program = require('commander');
const { build, buildFull } = require('../src/build');
const copyFiles = require('../src/copy-files');

program
  .version(require('../package.json').version)
  .option('-c, --copy-files', 'copy files only')
  .option('-f, --full', 'complete build pipeline')
  .option('-t, --targets <target>', 'Target', arg => arg.split(','))
  .parse(process.argv);

if (program.full) {
  buildFull(program.targets);
} else if (program.targets) {
  program.targets.map(build);
} else if (program.copyFiles) {
  copyFiles();
} else {
  throw new Error(program.usage());
}
