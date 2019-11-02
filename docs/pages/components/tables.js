import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/components/tables/tables.mdx')),
  aa: dynamic(() => import('../../src/pages/components/tables/tables-aa.mdx')),
  de: dynamic(() => import('../../src/pages/components/tables/tables-de.mdx')),
  es: dynamic(() => import('../../src/pages/components/tables/tables-es.mdx')),
  fr: dynamic(() => import('../../src/pages/components/tables/tables-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/components/tables/tables-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/components/tables/tables-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/components/tables/tables-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/components/tables/tables-zh.mdx')),
};

export default function TablesPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}
