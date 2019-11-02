import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/styles/advanced/advanced.mdx')),
  aa: dynamic(() => import('../../src/pages/styles/advanced/advanced-aa.mdx')),
  de: dynamic(() => import('../../src/pages/styles/advanced/advanced-de.mdx')),
  es: dynamic(() => import('../../src/pages/styles/advanced/advanced-es.mdx')),
  fr: dynamic(() => import('../../src/pages/styles/advanced/advanced-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/styles/advanced/advanced-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/styles/advanced/advanced-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/styles/advanced/advanced-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/styles/advanced/advanced-zh.mdx')),
};

export default function AdvancedPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}
