import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/components/paper/paper.mdx')),
  aa: dynamic(() => import('../../src/pages/components/paper/paper-aa.mdx')),
  de: dynamic(() => import('../../src/pages/components/paper/paper-de.mdx')),
  es: dynamic(() => import('../../src/pages/components/paper/paper-es.mdx')),
  fr: dynamic(() => import('../../src/pages/components/paper/paper-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/components/paper/paper-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/components/paper/paper-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/components/paper/paper-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/components/paper/paper-zh.mdx')),
};

export default function PaperPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}
