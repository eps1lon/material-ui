import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/components/box/box.mdx')),
  aa: dynamic(() => import('../../src/pages/components/box/box-aa.mdx')),
  de: dynamic(() => import('../../src/pages/components/box/box-de.mdx')),
  es: dynamic(() => import('../../src/pages/components/box/box-es.mdx')),
  fr: dynamic(() => import('../../src/pages/components/box/box-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/components/box/box-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/components/box/box-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/components/box/box-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/components/box/box-zh.mdx')),
};

export default function BoxPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}
