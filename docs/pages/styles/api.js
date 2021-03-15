import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import { prepareMarkdown } from 'docs/src/modules/utils/parseMarkdown';

const pageFilename = 'styles/api';
const requireDemo = require.context('docs/src/pages/styles/api', false, /\.(js|tsx)$/);
const requireRaw = require.context('../../src/pages/styles/api?raw', false, /\.(js|md|tsx)$/);

export default function Page({ demos, docs }) {
  return <MarkdownDocs demos={demos} docs={docs} requireDemo={requireDemo} />;
}

Page.getInitialProps = () => {
  const { demos, docs } = prepareMarkdown({ pageFilename, requireRaw });
  return { demos, docs };
};
