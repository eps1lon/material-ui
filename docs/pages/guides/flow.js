import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/guides/flow/flow.mdx')),
  aa: dynamic(() => import('../../src/pages/guides/flow/flow-aa.mdx')),
  de: dynamic(() => import('../../src/pages/guides/flow/flow-de.mdx')),
  es: dynamic(() => import('../../src/pages/guides/flow/flow-es.mdx')),
  fr: dynamic(() => import('../../src/pages/guides/flow/flow-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/guides/flow/flow-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/guides/flow/flow-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/guides/flow/flow-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/guides/flow/flow-zh.mdx')),
};

export default function FlowPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}
