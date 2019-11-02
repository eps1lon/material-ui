
import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/components/tooltips/tooltips.mdx')),
  aa: dynamic(() => import('../../src/pages/components/tooltips/tooltips-aa.mdx')),
  de: dynamic(() => import('../../src/pages/components/tooltips/tooltips-de.mdx')),
  es: dynamic(() => import('../../src/pages/components/tooltips/tooltips-es.mdx')),
  fr: dynamic(() => import('../../src/pages/components/tooltips/tooltips-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/components/tooltips/tooltips-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/components/tooltips/tooltips-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/components/tooltips/tooltips-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/components/tooltips/tooltips-zh.mdx')),
};

export default function TooltipsPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}

