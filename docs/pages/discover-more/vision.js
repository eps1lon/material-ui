import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/discover-more/vision/vision.mdx')),
  aa: dynamic(() => import('../../src/pages/discover-more/vision/vision-aa.mdx')),
  de: dynamic(() => import('../../src/pages/discover-more/vision/vision-de.mdx')),
  es: dynamic(() => import('../../src/pages/discover-more/vision/vision-es.mdx')),
  fr: dynamic(() => import('../../src/pages/discover-more/vision/vision-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/discover-more/vision/vision-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/discover-more/vision/vision-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/discover-more/vision/vision-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/discover-more/vision/vision-zh.mdx')),
};

export default function VisionPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}
