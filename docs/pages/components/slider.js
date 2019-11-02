import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/components/slider/slider.mdx')),
  aa: dynamic(() => import('../../src/pages/components/slider/slider-aa.mdx')),
  de: dynamic(() => import('../../src/pages/components/slider/slider-de.mdx')),
  es: dynamic(() => import('../../src/pages/components/slider/slider-es.mdx')),
  fr: dynamic(() => import('../../src/pages/components/slider/slider-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/components/slider/slider-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/components/slider/slider-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/components/slider/slider-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/components/slider/slider-zh.mdx')),
};

export default function SliderPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}
