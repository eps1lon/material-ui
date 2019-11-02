
import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/components/drawers/drawers.mdx')),
  aa: dynamic(() => import('../../src/pages/components/drawers/drawers-aa.mdx')),
  de: dynamic(() => import('../../src/pages/components/drawers/drawers-de.mdx')),
  es: dynamic(() => import('../../src/pages/components/drawers/drawers-es.mdx')),
  fr: dynamic(() => import('../../src/pages/components/drawers/drawers-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/components/drawers/drawers-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/components/drawers/drawers-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/components/drawers/drawers-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/components/drawers/drawers-zh.mdx')),
};

export default function DrawersPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}

