
import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/customization/breakpoints/breakpoints.mdx')),
  aa: dynamic(() => import('../../src/pages/customization/breakpoints/breakpoints-aa.mdx')),
  de: dynamic(() => import('../../src/pages/customization/breakpoints/breakpoints-de.mdx')),
  es: dynamic(() => import('../../src/pages/customization/breakpoints/breakpoints-es.mdx')),
  fr: dynamic(() => import('../../src/pages/customization/breakpoints/breakpoints-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/customization/breakpoints/breakpoints-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/customization/breakpoints/breakpoints-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/customization/breakpoints/breakpoints-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/customization/breakpoints/breakpoints-zh.mdx')),
};

export default function BreakpointsPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}

