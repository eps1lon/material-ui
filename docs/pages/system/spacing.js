
import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/system/spacing/spacing.mdx')),
  aa: dynamic(() => import('../../src/pages/system/spacing/spacing-aa.mdx')),
  de: dynamic(() => import('../../src/pages/system/spacing/spacing-de.mdx')),
  es: dynamic(() => import('../../src/pages/system/spacing/spacing-es.mdx')),
  fr: dynamic(() => import('../../src/pages/system/spacing/spacing-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/system/spacing/spacing-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/system/spacing/spacing-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/system/spacing/spacing-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/system/spacing/spacing-zh.mdx')),
};

export default function SpacingPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}

