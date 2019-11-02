import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/system/api/api.mdx')),
  aa: dynamic(() => import('../../src/pages/system/api/api-aa.mdx')),
  de: dynamic(() => import('../../src/pages/system/api/api-de.mdx')),
  es: dynamic(() => import('../../src/pages/system/api/api-es.mdx')),
  fr: dynamic(() => import('../../src/pages/system/api/api-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/system/api/api-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/system/api/api-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/system/api/api-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/system/api/api-zh.mdx')),
};

export default function ApiPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}
