
import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/customization/spacing/spacing.mdx')),
  aa: dynamic(() => import('../../src/pages/customization/spacing/spacing-aa.mdx')),
  de: dynamic(() => import('../../src/pages/customization/spacing/spacing-de.mdx')),
  es: dynamic(() => import('../../src/pages/customization/spacing/spacing-es.mdx')),
  fr: dynamic(() => import('../../src/pages/customization/spacing/spacing-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/customization/spacing/spacing-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/customization/spacing/spacing-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/customization/spacing/spacing-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/customization/spacing/spacing-zh.mdx')),
};

export default function SpacingPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}

