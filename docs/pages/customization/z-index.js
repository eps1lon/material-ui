import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/customization/z-index/z-index.mdx')),
  aa: dynamic(() => import('../../src/pages/customization/z-index/z-index-aa.mdx')),
  de: dynamic(() => import('../../src/pages/customization/z-index/z-index-de.mdx')),
  es: dynamic(() => import('../../src/pages/customization/z-index/z-index-es.mdx')),
  fr: dynamic(() => import('../../src/pages/customization/z-index/z-index-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/customization/z-index/z-index-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/customization/z-index/z-index-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/customization/z-index/z-index-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/customization/z-index/z-index-zh.mdx')),
};

export default function ZIndexPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}
