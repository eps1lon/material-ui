#!/usr/bin/env node
const program = require('commander');
const path = require('path');
const { buildRollup, buildTargets, copyFiles, fullBuild } = require('../src/tasks');

function rejectTask(getReason) {
  // mocked Listr
  return {
    run: () => Promise.reject(new Error(getReason())),
  };
}

let task = rejectTask(program.usage);

program
  .version(require('../package.json').version)
  .command('package')
  .option('-t, --targets <targets>', 'Targets', arg => arg.split(','))
  .option('-r, --rollup <configPath>', 'Executes rollup with the given config')
  .action((cmd) => {
    if (!cmd.targets || !cmd.targets.length) {
      task = rejectTask(() => '`--targets` cannot be empty');
    } else {
      task = fullBuild(cmd.targets, { rollupConfig: cmd.rollup });
    }
  })
  .command('copy-files')
  .action(() => {
    task = copyFiles();
  })
  .command('targets <targets>')
  .action(targets => {
    task = buildTargets(targets.split(','));
  })
  .command('rollup <config>', config => {
    task = buildRollup(path.join(process.cwd(), config));
  });

program.parse(process.argv);

task.run().catch(err => {
  console.error(err);
  process.exit(1);
});
