import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/components/buttons/buttons.mdx')),
  aa: dynamic(() => import('../../src/pages/components/buttons/buttons-aa.mdx')),
  de: dynamic(() => import('../../src/pages/components/buttons/buttons-de.mdx')),
  es: dynamic(() => import('../../src/pages/components/buttons/buttons-es.mdx')),
  fr: dynamic(() => import('../../src/pages/components/buttons/buttons-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/components/buttons/buttons-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/components/buttons/buttons-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/components/buttons/buttons-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/components/buttons/buttons-zh.mdx')),
};

export default function ButtonsPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}
