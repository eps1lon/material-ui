import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/components/switches/switches.mdx')),
  aa: dynamic(() => import('../../src/pages/components/switches/switches-aa.mdx')),
  de: dynamic(() => import('../../src/pages/components/switches/switches-de.mdx')),
  es: dynamic(() => import('../../src/pages/components/switches/switches-es.mdx')),
  fr: dynamic(() => import('../../src/pages/components/switches/switches-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/components/switches/switches-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/components/switches/switches-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/components/switches/switches-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/components/switches/switches-zh.mdx')),
};

export default function SwitchesPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}
