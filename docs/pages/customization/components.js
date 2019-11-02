
import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/customization/components/components.mdx')),
  aa: dynamic(() => import('../../src/pages/customization/components/components-aa.mdx')),
  de: dynamic(() => import('../../src/pages/customization/components/components-de.mdx')),
  es: dynamic(() => import('../../src/pages/customization/components/components-es.mdx')),
  fr: dynamic(() => import('../../src/pages/customization/components/components-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/customization/components/components-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/customization/components/components-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/customization/components/components-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/customization/components/components-zh.mdx')),
};

export default function ComponentsPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}

