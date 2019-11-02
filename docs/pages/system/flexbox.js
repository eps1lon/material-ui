
import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/system/flexbox/flexbox.mdx')),
  aa: dynamic(() => import('../../src/pages/system/flexbox/flexbox-aa.mdx')),
  de: dynamic(() => import('../../src/pages/system/flexbox/flexbox-de.mdx')),
  es: dynamic(() => import('../../src/pages/system/flexbox/flexbox-es.mdx')),
  fr: dynamic(() => import('../../src/pages/system/flexbox/flexbox-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/system/flexbox/flexbox-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/system/flexbox/flexbox-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/system/flexbox/flexbox-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/system/flexbox/flexbox-zh.mdx')),
};

export default function FlexboxPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}

