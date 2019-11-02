
import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/styles/api/api.mdx')),
  aa: dynamic(() => import('../../src/pages/styles/api/api-aa.mdx')),
  de: dynamic(() => import('../../src/pages/styles/api/api-de.mdx')),
  es: dynamic(() => import('../../src/pages/styles/api/api-es.mdx')),
  fr: dynamic(() => import('../../src/pages/styles/api/api-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/styles/api/api-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/styles/api/api-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/styles/api/api-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/styles/api/api-zh.mdx')),
};

export default function ApiPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}

