
import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/components/use-media-query/use-media-query.mdx')),
  aa: dynamic(() => import('../../src/pages/components/use-media-query/use-media-query-aa.mdx')),
  de: dynamic(() => import('../../src/pages/components/use-media-query/use-media-query-de.mdx')),
  es: dynamic(() => import('../../src/pages/components/use-media-query/use-media-query-es.mdx')),
  fr: dynamic(() => import('../../src/pages/components/use-media-query/use-media-query-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/components/use-media-query/use-media-query-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/components/use-media-query/use-media-query-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/components/use-media-query/use-media-query-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/components/use-media-query/use-media-query-zh.mdx')),
};

export default function UseMediaQueryPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}

