const util = require('util');
const childProcess = require('child_process');

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

async function previewLinks(workspace, event) {
  const gitDiff = await execGitCmd(['diff', '--name-only', event.base.sha]);
  const gitLs = await execGitCmd(['ls-files', '--others', '--exclude-standard']);
  const changedFiles = new Set([...gitDiff, ...gitLs]);

  return Array.from(changedFiles).join(', ');
}

module.exports = previewLinks;
