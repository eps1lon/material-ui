
import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/components/about-the-lab/about-the-lab.mdx')),
  aa: dynamic(() => import('../../src/pages/components/about-the-lab/about-the-lab-aa.mdx')),
  de: dynamic(() => import('../../src/pages/components/about-the-lab/about-the-lab-de.mdx')),
  es: dynamic(() => import('../../src/pages/components/about-the-lab/about-the-lab-es.mdx')),
  fr: dynamic(() => import('../../src/pages/components/about-the-lab/about-the-lab-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/components/about-the-lab/about-the-lab-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/components/about-the-lab/about-the-lab-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/components/about-the-lab/about-the-lab-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/components/about-the-lab/about-the-lab-zh.mdx')),
};

export default function AboutTheLabPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}

