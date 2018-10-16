const fs = require('fs');

/**
 *
 * @param {ImportDeclaration} param0
 */
function isImportFromStyles({ source }) {
  return source.value === '@material-ui/core/styles';
}

/**
 *
 * @param {CallExpression} param0
 */
function isCreateStylesCall({ callee }) {
  return callee.name === 'createStyles';
}

/**
 *
 * @param {ImportSpecifier} param0
 */
function isCreateStylesImportSepcifier({ imported }) {
  return imported.name === 'createStyles';
}

function unwrapCallExpression(node, t) {
  if (node.arguments.length !== 1) {
    throw new Error('need exactly one argument');
  }

  return node.arguments[0];
}

module.exports = function unwrapCreateStyles({ types: t }) {
  return {
    visitor: {
      CallExpression(path) {
        if (isCreateStylesCall(path.node)) {
          path.replaceWith(unwrapCallExpression(path.node, t));
        }
      },
      ImportSpecifier(path) {
        if (isImportFromStyles(path.parent) && isCreateStylesImportSepcifier(path.node)) {
          path.remove();
        }
      },
    },
    post(state) {
      fs.writeFileSync(`debug-${Date.now()}.json`, JSON.stringify(state.ast, null, 2));
    },
  };
};
