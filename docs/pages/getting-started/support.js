import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/getting-started/support/support.mdx')),
  aa: dynamic(() => import('../../src/pages/getting-started/support/support-aa.mdx')),
  de: dynamic(() => import('../../src/pages/getting-started/support/support-de.mdx')),
  es: dynamic(() => import('../../src/pages/getting-started/support/support-es.mdx')),
  fr: dynamic(() => import('../../src/pages/getting-started/support/support-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/getting-started/support/support-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/getting-started/support/support-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/getting-started/support/support-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/getting-started/support/support-zh.mdx')),
};

export default function SupportPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}
