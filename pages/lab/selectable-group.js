import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

function Page() {
  return (
    <MarkdownDocs
      demos={{
        'pages/lab/selectable-group/RadioButtons.js': {
          js: require('docs/src/pages/lab/selectable-group/RadioButtons').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/lab/selectable-group/RadioButtons'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
