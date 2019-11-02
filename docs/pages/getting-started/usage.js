
import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/getting-started/usage/usage.mdx')),
  aa: dynamic(() => import('../../src/pages/getting-started/usage/usage-aa.mdx')),
  de: dynamic(() => import('../../src/pages/getting-started/usage/usage-de.mdx')),
  es: dynamic(() => import('../../src/pages/getting-started/usage/usage-es.mdx')),
  fr: dynamic(() => import('../../src/pages/getting-started/usage/usage-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/getting-started/usage/usage-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/getting-started/usage/usage-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/getting-started/usage/usage-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/getting-started/usage/usage-zh.mdx')),
};

export default function UsagePage() {
  return <MarkdownXDocs translatedPages={pages} />;
}

