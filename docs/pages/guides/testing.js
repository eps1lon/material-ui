import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/guides/testing/testing.mdx')),
  aa: dynamic(() => import('../../src/pages/guides/testing/testing-aa.mdx')),
  de: dynamic(() => import('../../src/pages/guides/testing/testing-de.mdx')),
  es: dynamic(() => import('../../src/pages/guides/testing/testing-es.mdx')),
  fr: dynamic(() => import('../../src/pages/guides/testing/testing-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/guides/testing/testing-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/guides/testing/testing-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/guides/testing/testing-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/guides/testing/testing-zh.mdx')),
};

export default function TestingPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}
