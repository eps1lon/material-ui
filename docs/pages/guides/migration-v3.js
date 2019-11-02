import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/guides/migration-v3/migration-v3.mdx')),
  aa: dynamic(() => import('../../src/pages/guides/migration-v3/migration-v3-aa.mdx')),
  de: dynamic(() => import('../../src/pages/guides/migration-v3/migration-v3-de.mdx')),
  es: dynamic(() => import('../../src/pages/guides/migration-v3/migration-v3-es.mdx')),
  fr: dynamic(() => import('../../src/pages/guides/migration-v3/migration-v3-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/guides/migration-v3/migration-v3-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/guides/migration-v3/migration-v3-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/guides/migration-v3/migration-v3-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/guides/migration-v3/migration-v3-zh.mdx')),
};

export default function MigrationV3Page() {
  return <MarkdownXDocs translatedPages={pages} />;
}
