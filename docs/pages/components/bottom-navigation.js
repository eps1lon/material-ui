
import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/components/bottom-navigation/bottom-navigation.mdx')),
  aa: dynamic(() => import('../../src/pages/components/bottom-navigation/bottom-navigation-aa.mdx')),
  de: dynamic(() => import('../../src/pages/components/bottom-navigation/bottom-navigation-de.mdx')),
  es: dynamic(() => import('../../src/pages/components/bottom-navigation/bottom-navigation-es.mdx')),
  fr: dynamic(() => import('../../src/pages/components/bottom-navigation/bottom-navigation-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/components/bottom-navigation/bottom-navigation-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/components/bottom-navigation/bottom-navigation-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/components/bottom-navigation/bottom-navigation-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/components/bottom-navigation/bottom-navigation-zh.mdx')),
};

export default function BottomNavigationPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}

