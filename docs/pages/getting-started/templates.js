
import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/getting-started/templates/templates.mdx')),
  aa: dynamic(() => import('../../src/pages/getting-started/templates/templates-aa.mdx')),
  de: dynamic(() => import('../../src/pages/getting-started/templates/templates-de.mdx')),
  es: dynamic(() => import('../../src/pages/getting-started/templates/templates-es.mdx')),
  fr: dynamic(() => import('../../src/pages/getting-started/templates/templates-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/getting-started/templates/templates-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/getting-started/templates/templates-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/getting-started/templates/templates-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/getting-started/templates/templates-zh.mdx')),
};

export default function TemplatesPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}

