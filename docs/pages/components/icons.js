
import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/components/icons/icons.mdx')),
  aa: dynamic(() => import('../../src/pages/components/icons/icons-aa.mdx')),
  de: dynamic(() => import('../../src/pages/components/icons/icons-de.mdx')),
  es: dynamic(() => import('../../src/pages/components/icons/icons-es.mdx')),
  fr: dynamic(() => import('../../src/pages/components/icons/icons-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/components/icons/icons-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/components/icons/icons-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/components/icons/icons-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/components/icons/icons-zh.mdx')),
};

export default function IconsPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}

