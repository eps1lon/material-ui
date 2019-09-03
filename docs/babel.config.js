const bpmr = require('babel-plugin-module-resolver');

function resolvePath(sourcePath, currentFile, opts) {
  if (sourcePath === 'markdown') {
    const base = currentFile.substring(__dirname.length).slice(0, -3);
    return `${__dirname}/docs/src/${base}/`;
  }

  return bpmr.resolvePath(sourcePath, currentFile, opts);
}

const alias = {
  '@material-ui/core': '../packages/material-ui/src',
  '@material-ui/docs': '../packages/material-ui-docs/src',
  '@material-ui/icons': '../packages/material-ui-icons/src',
  '@material-ui/lab': '../packages/material-ui-lab/src',
  '@material-ui/styles': '../packages/material-ui-styles/src',
  '@material-ui/system': '../packages/material-ui-system/src',
  '@material-ui/utils': '../packages/material-ui-utils/src',
  docs: './',
  modules: '../modules',
  pages: './pages',
};

module.exports = {
  presets: [require.resolve('next/babel'), require.resolve('@zeit/next-typescript/babel')],
  plugins: [
    require.resolve('babel-plugin-optimize-clsx'),
    // for IE 11 support
    require.resolve('@babel/plugin-transform-object-assign'),
    require.resolve('babel-plugin-preval'),
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        alias,
        transformFunctions: ['require', 'require.context'],
        resolvePath,
      },
    ],
  ],
  ignore: [/@babel[\\|/]runtime/], // Fix a Windows issue.
  env: {
    production: {
      plugins: [
        require.resolve('babel-plugin-transform-react-constant-elements'),
        require.resolve('babel-plugin-transform-dev-warning'),
        [
          require.resolve('babel-plugin-react-remove-properties'),
          { properties: ['data-mui-test'] },
        ],
        [require.resolve('babel-plugin-transform-react-remove-prop-types'), { mode: 'remove' }],
      ],
    },
  },
};
