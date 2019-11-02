import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/components/hidden/hidden.mdx')),
  aa: dynamic(() => import('../../src/pages/components/hidden/hidden-aa.mdx')),
  de: dynamic(() => import('../../src/pages/components/hidden/hidden-de.mdx')),
  es: dynamic(() => import('../../src/pages/components/hidden/hidden-es.mdx')),
  fr: dynamic(() => import('../../src/pages/components/hidden/hidden-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/components/hidden/hidden-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/components/hidden/hidden-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/components/hidden/hidden-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/components/hidden/hidden-zh.mdx')),
};

export default function HiddenPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}
