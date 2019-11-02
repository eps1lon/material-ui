
import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/components/tabs/tabs.mdx')),
  aa: dynamic(() => import('../../src/pages/components/tabs/tabs-aa.mdx')),
  de: dynamic(() => import('../../src/pages/components/tabs/tabs-de.mdx')),
  es: dynamic(() => import('../../src/pages/components/tabs/tabs-es.mdx')),
  fr: dynamic(() => import('../../src/pages/components/tabs/tabs-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/components/tabs/tabs-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/components/tabs/tabs-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/components/tabs/tabs-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/components/tabs/tabs-zh.mdx')),
};

export default function TabsPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}

