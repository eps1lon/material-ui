import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/components/transfer-list/transfer-list.mdx')),
  aa: dynamic(() => import('../../src/pages/components/transfer-list/transfer-list-aa.mdx')),
  de: dynamic(() => import('../../src/pages/components/transfer-list/transfer-list-de.mdx')),
  es: dynamic(() => import('../../src/pages/components/transfer-list/transfer-list-es.mdx')),
  fr: dynamic(() => import('../../src/pages/components/transfer-list/transfer-list-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/components/transfer-list/transfer-list-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/components/transfer-list/transfer-list-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/components/transfer-list/transfer-list-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/components/transfer-list/transfer-list-zh.mdx')),
};

export default function TransferListPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}
