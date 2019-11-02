
import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/components/grid-list/grid-list.mdx')),
  aa: dynamic(() => import('../../src/pages/components/grid-list/grid-list-aa.mdx')),
  de: dynamic(() => import('../../src/pages/components/grid-list/grid-list-de.mdx')),
  es: dynamic(() => import('../../src/pages/components/grid-list/grid-list-es.mdx')),
  fr: dynamic(() => import('../../src/pages/components/grid-list/grid-list-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/components/grid-list/grid-list-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/components/grid-list/grid-list-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/components/grid-list/grid-list-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/components/grid-list/grid-list-zh.mdx')),
};

export default function GridListPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}

