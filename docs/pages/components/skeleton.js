
import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/components/skeleton/skeleton.mdx')),
  aa: dynamic(() => import('../../src/pages/components/skeleton/skeleton-aa.mdx')),
  de: dynamic(() => import('../../src/pages/components/skeleton/skeleton-de.mdx')),
  es: dynamic(() => import('../../src/pages/components/skeleton/skeleton-es.mdx')),
  fr: dynamic(() => import('../../src/pages/components/skeleton/skeleton-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/components/skeleton/skeleton-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/components/skeleton/skeleton-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/components/skeleton/skeleton-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/components/skeleton/skeleton-zh.mdx')),
};

export default function SkeletonPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}

