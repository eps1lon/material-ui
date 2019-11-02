import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/discover-more/changelog/changelog.mdx')),
  aa: dynamic(() => import('../../src/pages/discover-more/changelog/changelog-aa.mdx')),
  de: dynamic(() => import('../../src/pages/discover-more/changelog/changelog-de.mdx')),
  es: dynamic(() => import('../../src/pages/discover-more/changelog/changelog-es.mdx')),
  fr: dynamic(() => import('../../src/pages/discover-more/changelog/changelog-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/discover-more/changelog/changelog-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/discover-more/changelog/changelog-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/discover-more/changelog/changelog-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/discover-more/changelog/changelog-zh.mdx')),
};

export default function ChangelogPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}
