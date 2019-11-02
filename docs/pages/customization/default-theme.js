
import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/customization/default-theme/default-theme.mdx')),
  aa: dynamic(() => import('../../src/pages/customization/default-theme/default-theme-aa.mdx')),
  de: dynamic(() => import('../../src/pages/customization/default-theme/default-theme-de.mdx')),
  es: dynamic(() => import('../../src/pages/customization/default-theme/default-theme-es.mdx')),
  fr: dynamic(() => import('../../src/pages/customization/default-theme/default-theme-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/customization/default-theme/default-theme-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/customization/default-theme/default-theme-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/customization/default-theme/default-theme-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/customization/default-theme/default-theme-zh.mdx')),
};

export default function DefaultThemePage() {
  return <MarkdownXDocs translatedPages={pages} />;
}

