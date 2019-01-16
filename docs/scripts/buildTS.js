const fs = require('fs');
const path = require('path');
const rdt = require('react-docgen-typescript');
const generateMarkdown = require('../src/modules/utils/generateMarkdown').default;

// yarn babel-node docs/scripts/buildTS.js

const parserOpts = {};
const tsconfigPath = path.join(__dirname, '../../tsconfig.json');
const parser = rdt.withCustomConfig(tsconfigPath, parserOpts);

const file = path.join(__dirname, '../../packages/material-ui/src/Typography/Typography.d.ts');
const docFile = path.join(__dirname, '../../pages/api/typography.md');
const parsed = parser.parse(file);

parsed.forEach(component => {
  const api = {
    ...component,
    // mock
    filename: file,
    // fake
    pagesMarkdown: [],
    styles: { classes: {} },
  };

  const markdown = generateMarkdown(api);

  fs.writeFileSync(docFile, markdown);
});
