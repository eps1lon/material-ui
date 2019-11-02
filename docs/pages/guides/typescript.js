
import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/guides/typescript/typescript.mdx')),
  aa: dynamic(() => import('../../src/pages/guides/typescript/typescript-aa.mdx')),
  de: dynamic(() => import('../../src/pages/guides/typescript/typescript-de.mdx')),
  es: dynamic(() => import('../../src/pages/guides/typescript/typescript-es.mdx')),
  fr: dynamic(() => import('../../src/pages/guides/typescript/typescript-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/guides/typescript/typescript-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/guides/typescript/typescript-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/guides/typescript/typescript-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/guides/typescript/typescript-zh.mdx')),
};

export default function TypescriptPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}

