import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/components/lists/lists.mdx')),
  aa: dynamic(() => import('../../src/pages/components/lists/lists-aa.mdx')),
  de: dynamic(() => import('../../src/pages/components/lists/lists-de.mdx')),
  es: dynamic(() => import('../../src/pages/components/lists/lists-es.mdx')),
  fr: dynamic(() => import('../../src/pages/components/lists/lists-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/components/lists/lists-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/components/lists/lists-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/components/lists/lists-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/components/lists/lists-zh.mdx')),
};

export default function ListsPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}
