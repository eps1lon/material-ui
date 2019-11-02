import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/guides/migration-v0x/migration-v0x.mdx')),
  aa: dynamic(() => import('../../src/pages/guides/migration-v0x/migration-v0x-aa.mdx')),
  de: dynamic(() => import('../../src/pages/guides/migration-v0x/migration-v0x-de.mdx')),
  es: dynamic(() => import('../../src/pages/guides/migration-v0x/migration-v0x-es.mdx')),
  fr: dynamic(() => import('../../src/pages/guides/migration-v0x/migration-v0x-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/guides/migration-v0x/migration-v0x-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/guides/migration-v0x/migration-v0x-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/guides/migration-v0x/migration-v0x-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/guides/migration-v0x/migration-v0x-zh.mdx')),
};

export default function MigrationV0xPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}
