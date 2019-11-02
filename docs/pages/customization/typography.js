
import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/customization/typography/typography.mdx')),
  aa: dynamic(() => import('../../src/pages/customization/typography/typography-aa.mdx')),
  de: dynamic(() => import('../../src/pages/customization/typography/typography-de.mdx')),
  es: dynamic(() => import('../../src/pages/customization/typography/typography-es.mdx')),
  fr: dynamic(() => import('../../src/pages/customization/typography/typography-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/customization/typography/typography-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/customization/typography/typography-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/customization/typography/typography-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/customization/typography/typography-zh.mdx')),
};

export default function TypographyPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}

