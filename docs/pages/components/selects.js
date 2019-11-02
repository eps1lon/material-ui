
import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/components/selects/selects.mdx')),
  aa: dynamic(() => import('../../src/pages/components/selects/selects-aa.mdx')),
  de: dynamic(() => import('../../src/pages/components/selects/selects-de.mdx')),
  es: dynamic(() => import('../../src/pages/components/selects/selects-es.mdx')),
  fr: dynamic(() => import('../../src/pages/components/selects/selects-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/components/selects/selects-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/components/selects/selects-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/components/selects/selects-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/components/selects/selects-zh.mdx')),
};

export default function SelectsPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}

