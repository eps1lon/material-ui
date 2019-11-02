import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/components/chips/chips.mdx')),
  aa: dynamic(() => import('../../src/pages/components/chips/chips-aa.mdx')),
  de: dynamic(() => import('../../src/pages/components/chips/chips-de.mdx')),
  es: dynamic(() => import('../../src/pages/components/chips/chips-es.mdx')),
  fr: dynamic(() => import('../../src/pages/components/chips/chips-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/components/chips/chips-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/components/chips/chips-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/components/chips/chips-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/components/chips/chips-zh.mdx')),
};

export default function ChipsPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}
