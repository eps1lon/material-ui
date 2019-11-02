import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/guides/composition/composition.mdx')),
  aa: dynamic(() => import('../../src/pages/guides/composition/composition-aa.mdx')),
  de: dynamic(() => import('../../src/pages/guides/composition/composition-de.mdx')),
  es: dynamic(() => import('../../src/pages/guides/composition/composition-es.mdx')),
  fr: dynamic(() => import('../../src/pages/guides/composition/composition-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/guides/composition/composition-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/guides/composition/composition-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/guides/composition/composition-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/guides/composition/composition-zh.mdx')),
};

export default function CompositionPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}
