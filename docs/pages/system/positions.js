
import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/system/positions/positions.mdx')),
  aa: dynamic(() => import('../../src/pages/system/positions/positions-aa.mdx')),
  de: dynamic(() => import('../../src/pages/system/positions/positions-de.mdx')),
  es: dynamic(() => import('../../src/pages/system/positions/positions-es.mdx')),
  fr: dynamic(() => import('../../src/pages/system/positions/positions-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/system/positions/positions-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/system/positions/positions-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/system/positions/positions-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/system/positions/positions-zh.mdx')),
};

export default function PositionsPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}

