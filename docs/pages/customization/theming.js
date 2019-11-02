
import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/customization/theming/theming.mdx')),
  aa: dynamic(() => import('../../src/pages/customization/theming/theming-aa.mdx')),
  de: dynamic(() => import('../../src/pages/customization/theming/theming-de.mdx')),
  es: dynamic(() => import('../../src/pages/customization/theming/theming-es.mdx')),
  fr: dynamic(() => import('../../src/pages/customization/theming/theming-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/customization/theming/theming-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/customization/theming/theming-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/customization/theming/theming-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/customization/theming/theming-zh.mdx')),
};

export default function ThemingPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}

