import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/guides/server-rendering/server-rendering.mdx')),
  aa: dynamic(() => import('../../src/pages/guides/server-rendering/server-rendering-aa.mdx')),
  de: dynamic(() => import('../../src/pages/guides/server-rendering/server-rendering-de.mdx')),
  es: dynamic(() => import('../../src/pages/guides/server-rendering/server-rendering-es.mdx')),
  fr: dynamic(() => import('../../src/pages/guides/server-rendering/server-rendering-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/guides/server-rendering/server-rendering-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/guides/server-rendering/server-rendering-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/guides/server-rendering/server-rendering-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/guides/server-rendering/server-rendering-zh.mdx')),
};

export default function ServerRenderingPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}
