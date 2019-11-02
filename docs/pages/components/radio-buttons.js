import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/components/radio-buttons/radio-buttons.mdx')),
  aa: dynamic(() => import('../../src/pages/components/radio-buttons/radio-buttons-aa.mdx')),
  de: dynamic(() => import('../../src/pages/components/radio-buttons/radio-buttons-de.mdx')),
  es: dynamic(() => import('../../src/pages/components/radio-buttons/radio-buttons-es.mdx')),
  fr: dynamic(() => import('../../src/pages/components/radio-buttons/radio-buttons-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/components/radio-buttons/radio-buttons-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/components/radio-buttons/radio-buttons-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/components/radio-buttons/radio-buttons-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/components/radio-buttons/radio-buttons-zh.mdx')),
};

export default function RadioButtonsPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}
