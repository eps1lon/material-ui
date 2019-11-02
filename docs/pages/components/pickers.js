import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/components/pickers/pickers.mdx')),
  aa: dynamic(() => import('../../src/pages/components/pickers/pickers-aa.mdx')),
  de: dynamic(() => import('../../src/pages/components/pickers/pickers-de.mdx')),
  es: dynamic(() => import('../../src/pages/components/pickers/pickers-es.mdx')),
  fr: dynamic(() => import('../../src/pages/components/pickers/pickers-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/components/pickers/pickers-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/components/pickers/pickers-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/components/pickers/pickers-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/components/pickers/pickers-zh.mdx')),
};

export default function PickersPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}
