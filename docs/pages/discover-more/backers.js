import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/discover-more/backers/backers.mdx')),
};

export default function BackersPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}
