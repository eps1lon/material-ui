
import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/components/cards/cards.mdx')),
  aa: dynamic(() => import('../../src/pages/components/cards/cards-aa.mdx')),
  de: dynamic(() => import('../../src/pages/components/cards/cards-de.mdx')),
  es: dynamic(() => import('../../src/pages/components/cards/cards-es.mdx')),
  fr: dynamic(() => import('../../src/pages/components/cards/cards-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/components/cards/cards-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/components/cards/cards-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/components/cards/cards-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/components/cards/cards-zh.mdx')),
};

export default function CardsPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}

