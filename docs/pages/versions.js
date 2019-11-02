import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../src/pages/versions/versions.mdx')),
  aa: dynamic(() => import('../src/pages/versions/versions-aa.mdx')),
  de: dynamic(() => import('../src/pages/versions/versions-de.mdx')),
  es: dynamic(() => import('../src/pages/versions/versions-es.mdx')),
  fr: dynamic(() => import('../src/pages/versions/versions-fr.mdx')),
  ja: dynamic(() => import('../src/pages/versions/versions-ja.mdx')),
  pt: dynamic(() => import('../src/pages/versions/versions-pt.mdx')),
  ru: dynamic(() => import('../src/pages/versions/versions-ru.mdx')),
  zh: dynamic(() => import('../src/pages/versions/versions-zh.mdx')),
};

export default function VersionsPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}
