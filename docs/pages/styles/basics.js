
import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/styles/basics/basics.mdx')),
  aa: dynamic(() => import('../../src/pages/styles/basics/basics-aa.mdx')),
  de: dynamic(() => import('../../src/pages/styles/basics/basics-de.mdx')),
  es: dynamic(() => import('../../src/pages/styles/basics/basics-es.mdx')),
  fr: dynamic(() => import('../../src/pages/styles/basics/basics-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/styles/basics/basics-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/styles/basics/basics-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/styles/basics/basics-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/styles/basics/basics-zh.mdx')),
};

export default function BasicsPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}

