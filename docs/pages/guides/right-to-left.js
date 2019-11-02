
import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/guides/right-to-left/right-to-left.mdx')),
  aa: dynamic(() => import('../../src/pages/guides/right-to-left/right-to-left-aa.mdx')),
  de: dynamic(() => import('../../src/pages/guides/right-to-left/right-to-left-de.mdx')),
  es: dynamic(() => import('../../src/pages/guides/right-to-left/right-to-left-es.mdx')),
  fr: dynamic(() => import('../../src/pages/guides/right-to-left/right-to-left-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/guides/right-to-left/right-to-left-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/guides/right-to-left/right-to-left-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/guides/right-to-left/right-to-left-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/guides/right-to-left/right-to-left-zh.mdx')),
};

export default function RightToLeftPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}

