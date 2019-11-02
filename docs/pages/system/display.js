
import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/system/display/display.mdx')),
  aa: dynamic(() => import('../../src/pages/system/display/display-aa.mdx')),
  de: dynamic(() => import('../../src/pages/system/display/display-de.mdx')),
  es: dynamic(() => import('../../src/pages/system/display/display-es.mdx')),
  fr: dynamic(() => import('../../src/pages/system/display/display-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/system/display/display-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/system/display/display-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/system/display/display-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/system/display/display-zh.mdx')),
};

export default function DisplayPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}

