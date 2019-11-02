
import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/components/rating/rating.mdx')),
  aa: dynamic(() => import('../../src/pages/components/rating/rating-aa.mdx')),
  de: dynamic(() => import('../../src/pages/components/rating/rating-de.mdx')),
  es: dynamic(() => import('../../src/pages/components/rating/rating-es.mdx')),
  fr: dynamic(() => import('../../src/pages/components/rating/rating-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/components/rating/rating-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/components/rating/rating-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/components/rating/rating-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/components/rating/rating-zh.mdx')),
};

export default function RatingPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}

