/* eslint-disable no-console */
const path = require('path');
const fse = require('fs-extra');
const glob = require('glob');

async function copyFile(file, { workspacePath }) {
  const buildPath = path.resolve(workspacePath, './build/', path.basename(file));
  await fse.copy(file, buildPath);
  console.log(`Copied ${file} to ${buildPath}`);
}

function typescriptCopy(from, to) {
  const files = glob.sync('**/*.d.ts', { cwd: from });
  const cmds = files.map(file => fse.copy(path.resolve(from, file), path.resolve(to, file)));
  return Promise.all(cmds);
}

async function createPackageFile({ workspacePath }) {
  const packageData = await fse.readFile(path.resolve(workspacePath, './package.json'), 'utf8');
  const { nyc, scripts, devDependencies, workspaces, ...packageDataOther } = JSON.parse(
    packageData,
  );
  const newPackageData = {
    ...packageDataOther,
    main: './index.js',
    module: './index.es.js',
    private: false,
  };
  const buildPath = path.resolve(workspacePath, './build/package.json');

  await fse.writeFile(buildPath, JSON.stringify(newPackageData, null, 2), 'utf8');
  console.log(`Created package.json in ${buildPath}`);

  return newPackageData;
}

async function prepend(file, string) {
  const data = await fse.readFile(file, 'utf8');
  await fse.writeFile(file, string + data, 'utf8');
}

async function addLicense(packageData, { workspacePath }) {
  const license = `/** @license Material-UI v${packageData.version}
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
`;
  const umdFiles = glob.sync('./build/umd/*.js', { cwd: workspacePath });

  await Promise.all(
    ['./build/index.js', './build/index.es.js', ...umdFiles].map(file =>
      prepend(path.resolve(workspacePath, file), license).then(() =>
        console.log(`Added license text to ${file}`),
      ),
    ),
  );
}

async function run() {
  const workspacePath = process.cwd();
  const context = { workspacePath };

  await Promise.all(
    ['../../README.md', '../../CHANGELOG.md', '../../LICENSE'].map(file => copyFile(file, context)),
  );
  const packageData = await createPackageFile(context);
  await addLicense(packageData, context);

  // TypeScript
  const from = path.resolve(workspacePath, './src');
  await Promise.all([
    typescriptCopy(from, path.resolve(workspacePath, './build')),
    typescriptCopy(from, path.resolve(workspacePath, './build/es')),
  ]);
}

module.exports = run;
