import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/components/links/links.mdx')),
  aa: dynamic(() => import('../../src/pages/components/links/links-aa.mdx')),
  de: dynamic(() => import('../../src/pages/components/links/links-de.mdx')),
  es: dynamic(() => import('../../src/pages/components/links/links-es.mdx')),
  fr: dynamic(() => import('../../src/pages/components/links/links-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/components/links/links-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/components/links/links-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/components/links/links-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/components/links/links-zh.mdx')),
};

export default function LinksPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}
