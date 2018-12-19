const Listr = require('listr');
const path = require('path');
const fse = require('fs-extra');
const glob = require('glob');

async function copyFile(file, { workspacePath }) {
  const buildPath = path.resolve(workspacePath, './build/', path.basename(file));
  await fse.copy(file, buildPath);
  return `Copied ${file} to ${buildPath}`;
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

  return { data: newPackageData, path: buildPath };
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

  return new Listr(
    ['./build/index.js', './build/index.esm.js', ...umdFiles].map(file => {
      const filePath = path.resolve(workspacePath, file);
      return {
        title: `Add license to ${file}`,
        skip: () => fse.exists(filePath).then(exists => !exists),
        task: task =>
          prepend(filePath, license).then(() => {
            task.title = `Added license text to ${file}`;
          }),
      };
    }),
    { collapse: false },
  );
}

function copyTextFiles(context) {
  return new Listr(
    ['../../README.md', '../../CHANGELOG.md', '../../LICENSE'].map(file => {
      return {
        title: `Copy ${file}`,
        task: () => copyFile(file, context),
      };
    }),
    { concurrent: true },
  );
}

function packageTask(context) {
  // these need to run sequential since license task requires package data from
  // the package task
  return new Listr([
    {
      title: 'Create package.json',
      task: (listrContext, task) => {
        return createPackageFile(context).then(({ data, path: packageJsonPath }) => {
          task.title = `Create package.json in ${packageJsonPath}`;
          listrContext.packageData = data;
        });
      },
    },
    {
      title: 'Add license',
      task: ({ packageData }) => addLicense(packageData, context),
    },
  ]);
}

function copyFiles() {
  const workspacePath = process.cwd();
  const context = { workspacePath };

  return new Listr(
    [
      {
        title: 'Copy text files',
        task: () => copyTextFiles(context),
      },
      {
        title: 'Package',
        task: () => packageTask(context),
      },
      {
        title: 'TypeScript files',
        task: () => {
          const from = path.resolve(workspacePath, './src');
          return Promise.all([
            typescriptCopy(from, path.resolve(workspacePath, './build')),
            typescriptCopy(from, path.resolve(workspacePath, './build/es')),
          ]);
        },
      },
    ],
    { collapse: false, concurrent: true },
  );
}

module.exports = copyFiles;
