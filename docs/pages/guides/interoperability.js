import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/guides/interoperability/interoperability.mdx')),
  aa: dynamic(() => import('../../src/pages/guides/interoperability/interoperability-aa.mdx')),
  de: dynamic(() => import('../../src/pages/guides/interoperability/interoperability-de.mdx')),
  es: dynamic(() => import('../../src/pages/guides/interoperability/interoperability-es.mdx')),
  fr: dynamic(() => import('../../src/pages/guides/interoperability/interoperability-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/guides/interoperability/interoperability-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/guides/interoperability/interoperability-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/guides/interoperability/interoperability-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/guides/interoperability/interoperability-zh.mdx')),
};

export default function InteroperabilityPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}
