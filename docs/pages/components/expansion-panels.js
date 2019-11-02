
import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/components/expansion-panels/expansion-panels.mdx')),
  aa: dynamic(() => import('../../src/pages/components/expansion-panels/expansion-panels-aa.mdx')),
  de: dynamic(() => import('../../src/pages/components/expansion-panels/expansion-panels-de.mdx')),
  es: dynamic(() => import('../../src/pages/components/expansion-panels/expansion-panels-es.mdx')),
  fr: dynamic(() => import('../../src/pages/components/expansion-panels/expansion-panels-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/components/expansion-panels/expansion-panels-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/components/expansion-panels/expansion-panels-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/components/expansion-panels/expansion-panels-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/components/expansion-panels/expansion-panels-zh.mdx')),
};

export default function ExpansionPanelsPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}

