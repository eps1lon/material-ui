
import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/components/dialogs/dialogs.mdx')),
  aa: dynamic(() => import('../../src/pages/components/dialogs/dialogs-aa.mdx')),
  de: dynamic(() => import('../../src/pages/components/dialogs/dialogs-de.mdx')),
  es: dynamic(() => import('../../src/pages/components/dialogs/dialogs-es.mdx')),
  fr: dynamic(() => import('../../src/pages/components/dialogs/dialogs-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/components/dialogs/dialogs-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/components/dialogs/dialogs-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/components/dialogs/dialogs-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/components/dialogs/dialogs-zh.mdx')),
};

export default function DialogsPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}

