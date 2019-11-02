
import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/discover-more/showcase/showcase.mdx')),
  aa: dynamic(() => import('../../src/pages/discover-more/showcase/showcase-aa.mdx')),
  de: dynamic(() => import('../../src/pages/discover-more/showcase/showcase-de.mdx')),
  es: dynamic(() => import('../../src/pages/discover-more/showcase/showcase-es.mdx')),
  fr: dynamic(() => import('../../src/pages/discover-more/showcase/showcase-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/discover-more/showcase/showcase-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/discover-more/showcase/showcase-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/discover-more/showcase/showcase-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/discover-more/showcase/showcase-zh.mdx')),
};

export default function ShowcasePage() {
  return <MarkdownXDocs translatedPages={pages} />;
}

