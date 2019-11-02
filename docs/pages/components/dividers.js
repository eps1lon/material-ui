
import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/components/dividers/dividers.mdx')),
  aa: dynamic(() => import('../../src/pages/components/dividers/dividers-aa.mdx')),
  de: dynamic(() => import('../../src/pages/components/dividers/dividers-de.mdx')),
  es: dynamic(() => import('../../src/pages/components/dividers/dividers-es.mdx')),
  fr: dynamic(() => import('../../src/pages/components/dividers/dividers-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/components/dividers/dividers-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/components/dividers/dividers-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/components/dividers/dividers-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/components/dividers/dividers-zh.mdx')),
};

export default function DividersPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}

