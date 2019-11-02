import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/system/shadows/shadows.mdx')),
  aa: dynamic(() => import('../../src/pages/system/shadows/shadows-aa.mdx')),
  de: dynamic(() => import('../../src/pages/system/shadows/shadows-de.mdx')),
  es: dynamic(() => import('../../src/pages/system/shadows/shadows-es.mdx')),
  fr: dynamic(() => import('../../src/pages/system/shadows/shadows-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/system/shadows/shadows-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/system/shadows/shadows-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/system/shadows/shadows-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/system/shadows/shadows-zh.mdx')),
};

export default function ShadowsPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}
