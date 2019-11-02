import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/components/transitions/transitions.mdx')),
  aa: dynamic(() => import('../../src/pages/components/transitions/transitions-aa.mdx')),
  de: dynamic(() => import('../../src/pages/components/transitions/transitions-de.mdx')),
  es: dynamic(() => import('../../src/pages/components/transitions/transitions-es.mdx')),
  fr: dynamic(() => import('../../src/pages/components/transitions/transitions-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/components/transitions/transitions-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/components/transitions/transitions-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/components/transitions/transitions-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/components/transitions/transitions-zh.mdx')),
};

export default function TransitionsPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}
