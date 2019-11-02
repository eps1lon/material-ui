
import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/components/no-ssr/no-ssr.mdx')),
  aa: dynamic(() => import('../../src/pages/components/no-ssr/no-ssr-aa.mdx')),
  de: dynamic(() => import('../../src/pages/components/no-ssr/no-ssr-de.mdx')),
  es: dynamic(() => import('../../src/pages/components/no-ssr/no-ssr-es.mdx')),
  fr: dynamic(() => import('../../src/pages/components/no-ssr/no-ssr-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/components/no-ssr/no-ssr-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/components/no-ssr/no-ssr-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/components/no-ssr/no-ssr-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/components/no-ssr/no-ssr-zh.mdx')),
};

export default function NoSsrPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}

