
import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/components/tree-view/tree-view.mdx')),
  aa: dynamic(() => import('../../src/pages/components/tree-view/tree-view-aa.mdx')),
  de: dynamic(() => import('../../src/pages/components/tree-view/tree-view-de.mdx')),
  es: dynamic(() => import('../../src/pages/components/tree-view/tree-view-es.mdx')),
  fr: dynamic(() => import('../../src/pages/components/tree-view/tree-view-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/components/tree-view/tree-view-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/components/tree-view/tree-view-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/components/tree-view/tree-view-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/components/tree-view/tree-view-zh.mdx')),
};

export default function TreeViewPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}

