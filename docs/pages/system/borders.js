
import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/system/borders/borders.mdx')),
  aa: dynamic(() => import('../../src/pages/system/borders/borders-aa.mdx')),
  de: dynamic(() => import('../../src/pages/system/borders/borders-de.mdx')),
  es: dynamic(() => import('../../src/pages/system/borders/borders-es.mdx')),
  fr: dynamic(() => import('../../src/pages/system/borders/borders-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/system/borders/borders-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/system/borders/borders-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/system/borders/borders-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/system/borders/borders-zh.mdx')),
};

export default function BordersPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}

