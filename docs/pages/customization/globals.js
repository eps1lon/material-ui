
import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/customization/globals/globals.mdx')),
  aa: dynamic(() => import('../../src/pages/customization/globals/globals-aa.mdx')),
  de: dynamic(() => import('../../src/pages/customization/globals/globals-de.mdx')),
  es: dynamic(() => import('../../src/pages/customization/globals/globals-es.mdx')),
  fr: dynamic(() => import('../../src/pages/customization/globals/globals-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/customization/globals/globals-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/customization/globals/globals-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/customization/globals/globals-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/customization/globals/globals-zh.mdx')),
};

export default function GlobalsPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}

