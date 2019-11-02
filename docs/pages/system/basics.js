import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/system/basics/basics.mdx')),
  aa: dynamic(() => import('../../src/pages/system/basics/basics-aa.mdx')),
  de: dynamic(() => import('../../src/pages/system/basics/basics-de.mdx')),
  es: dynamic(() => import('../../src/pages/system/basics/basics-es.mdx')),
  fr: dynamic(() => import('../../src/pages/system/basics/basics-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/system/basics/basics-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/system/basics/basics-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/system/basics/basics-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/system/basics/basics-zh.mdx')),
};

export default function BasicsPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}
