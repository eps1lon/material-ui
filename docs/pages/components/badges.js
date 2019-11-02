
import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/components/badges/badges.mdx')),
  aa: dynamic(() => import('../../src/pages/components/badges/badges-aa.mdx')),
  de: dynamic(() => import('../../src/pages/components/badges/badges-de.mdx')),
  es: dynamic(() => import('../../src/pages/components/badges/badges-es.mdx')),
  fr: dynamic(() => import('../../src/pages/components/badges/badges-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/components/badges/badges-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/components/badges/badges-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/components/badges/badges-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/components/badges/badges-zh.mdx')),
};

export default function BadgesPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}

