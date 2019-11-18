import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/getting-started/support/support.mdx')),
};

export default function SupportPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}
