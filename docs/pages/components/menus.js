
import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/components/menus/menus.mdx')),
  aa: dynamic(() => import('../../src/pages/components/menus/menus-aa.mdx')),
  de: dynamic(() => import('../../src/pages/components/menus/menus-de.mdx')),
  es: dynamic(() => import('../../src/pages/components/menus/menus-es.mdx')),
  fr: dynamic(() => import('../../src/pages/components/menus/menus-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/components/menus/menus-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/components/menus/menus-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/components/menus/menus-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/components/menus/menus-zh.mdx')),
};

export default function MenusPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}

