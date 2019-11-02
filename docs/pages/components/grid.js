
import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/components/grid/grid.mdx')),
  aa: dynamic(() => import('../../src/pages/components/grid/grid-aa.mdx')),
  de: dynamic(() => import('../../src/pages/components/grid/grid-de.mdx')),
  es: dynamic(() => import('../../src/pages/components/grid/grid-es.mdx')),
  fr: dynamic(() => import('../../src/pages/components/grid/grid-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/components/grid/grid-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/components/grid/grid-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/components/grid/grid-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/components/grid/grid-zh.mdx')),
};

export default function GridPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}

