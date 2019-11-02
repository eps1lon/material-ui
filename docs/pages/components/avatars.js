import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/components/avatars/avatars.mdx')),
  aa: dynamic(() => import('../../src/pages/components/avatars/avatars-aa.mdx')),
  de: dynamic(() => import('../../src/pages/components/avatars/avatars-de.mdx')),
  es: dynamic(() => import('../../src/pages/components/avatars/avatars-es.mdx')),
  fr: dynamic(() => import('../../src/pages/components/avatars/avatars-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/components/avatars/avatars-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/components/avatars/avatars-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/components/avatars/avatars-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/components/avatars/avatars-zh.mdx')),
};

export default function AvatarsPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}
