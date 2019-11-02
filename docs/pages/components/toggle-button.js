
import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/components/toggle-button/toggle-button.mdx')),
  aa: dynamic(() => import('../../src/pages/components/toggle-button/toggle-button-aa.mdx')),
  de: dynamic(() => import('../../src/pages/components/toggle-button/toggle-button-de.mdx')),
  es: dynamic(() => import('../../src/pages/components/toggle-button/toggle-button-es.mdx')),
  fr: dynamic(() => import('../../src/pages/components/toggle-button/toggle-button-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/components/toggle-button/toggle-button-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/components/toggle-button/toggle-button-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/components/toggle-button/toggle-button-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/components/toggle-button/toggle-button-zh.mdx')),
};

export default function ToggleButtonPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}

