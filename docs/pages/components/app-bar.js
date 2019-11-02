import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/components/app-bar/app-bar.mdx')),
  aa: dynamic(() => import('../../src/pages/components/app-bar/app-bar-aa.mdx')),
  de: dynamic(() => import('../../src/pages/components/app-bar/app-bar-de.mdx')),
  es: dynamic(() => import('../../src/pages/components/app-bar/app-bar-es.mdx')),
  fr: dynamic(() => import('../../src/pages/components/app-bar/app-bar-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/components/app-bar/app-bar-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/components/app-bar/app-bar-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/components/app-bar/app-bar-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/components/app-bar/app-bar-zh.mdx')),
};

export default function AppBarPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}
