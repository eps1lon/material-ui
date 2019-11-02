import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/system/sizing/sizing.mdx')),
  aa: dynamic(() => import('../../src/pages/system/sizing/sizing-aa.mdx')),
  de: dynamic(() => import('../../src/pages/system/sizing/sizing-de.mdx')),
  es: dynamic(() => import('../../src/pages/system/sizing/sizing-es.mdx')),
  fr: dynamic(() => import('../../src/pages/system/sizing/sizing-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/system/sizing/sizing-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/system/sizing/sizing-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/system/sizing/sizing-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/system/sizing/sizing-zh.mdx')),
};

export default function SizingPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}
