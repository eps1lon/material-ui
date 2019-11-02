import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/components/css-baseline/css-baseline.mdx')),
  aa: dynamic(() => import('../../src/pages/components/css-baseline/css-baseline-aa.mdx')),
  de: dynamic(() => import('../../src/pages/components/css-baseline/css-baseline-de.mdx')),
  es: dynamic(() => import('../../src/pages/components/css-baseline/css-baseline-es.mdx')),
  fr: dynamic(() => import('../../src/pages/components/css-baseline/css-baseline-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/components/css-baseline/css-baseline-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/components/css-baseline/css-baseline-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/components/css-baseline/css-baseline-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/components/css-baseline/css-baseline-zh.mdx')),
};

export default function CssBaselinePage() {
  return <MarkdownXDocs translatedPages={pages} />;
}
