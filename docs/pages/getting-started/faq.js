import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/getting-started/faq/faq.mdx')),
  aa: dynamic(() => import('../../src/pages/getting-started/faq/faq-aa.mdx')),
  de: dynamic(() => import('../../src/pages/getting-started/faq/faq-de.mdx')),
  es: dynamic(() => import('../../src/pages/getting-started/faq/faq-es.mdx')),
  fr: dynamic(() => import('../../src/pages/getting-started/faq/faq-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/getting-started/faq/faq-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/getting-started/faq/faq-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/getting-started/faq/faq-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/getting-started/faq/faq-zh.mdx')),
};

export default function FaqPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}
