const util = require('util');
const childProcess = require('child_process');
const { uniq: unique } = require('lodash');

const execFileAsync = util.promisify(childProcess.execFile);

async function exec(command, args) {
  const options = {
    cwd: process.cwd(),
    env: process.env,
    stdio: 'pipe',
    encoding: 'utf-8',
  };

  const results = await execFileAsync(command, args, options);
  return results.stdout;
}

async function execGitCmd(args) {
  const gitResults = await exec('git', args);
  return gitResults
    .trim()
    .toString()
    .split('\n');
}

async function listChangedFiles(pullRequest) {
  const mergeBase = pullRequest.base.sha;
  const gitDiff = await execGitCmd(['diff', '--name-only', mergeBase]);
  const gitLs = await execGitCmd(['ls-files', '--others', '--exclude-standard']);
  return unique([...gitDiff, ...gitLs]);
}

module.exports = listChangedFiles;
