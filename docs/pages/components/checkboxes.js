
import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/components/checkboxes/checkboxes.mdx')),
  aa: dynamic(() => import('../../src/pages/components/checkboxes/checkboxes-aa.mdx')),
  de: dynamic(() => import('../../src/pages/components/checkboxes/checkboxes-de.mdx')),
  es: dynamic(() => import('../../src/pages/components/checkboxes/checkboxes-es.mdx')),
  fr: dynamic(() => import('../../src/pages/components/checkboxes/checkboxes-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/components/checkboxes/checkboxes-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/components/checkboxes/checkboxes-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/components/checkboxes/checkboxes-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/components/checkboxes/checkboxes-zh.mdx')),
};

export default function CheckboxesPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}

