import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/getting-started/learn/learn.mdx')),
  aa: dynamic(() => import('../../src/pages/getting-started/learn/learn-aa.mdx')),
  de: dynamic(() => import('../../src/pages/getting-started/learn/learn-de.mdx')),
  es: dynamic(() => import('../../src/pages/getting-started/learn/learn-es.mdx')),
  fr: dynamic(() => import('../../src/pages/getting-started/learn/learn-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/getting-started/learn/learn-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/getting-started/learn/learn-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/getting-started/learn/learn-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/getting-started/learn/learn-zh.mdx')),
};

export default function LearnPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}
