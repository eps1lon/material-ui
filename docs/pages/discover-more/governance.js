import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/discover-more/governance/governance.mdx')),
};

export default function GovernancePage() {
  return <MarkdownXDocs translatedPages={pages} />;
}
