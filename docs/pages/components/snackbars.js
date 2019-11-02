import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/components/snackbars/snackbars.mdx')),
  aa: dynamic(() => import('../../src/pages/components/snackbars/snackbars-aa.mdx')),
  de: dynamic(() => import('../../src/pages/components/snackbars/snackbars-de.mdx')),
  es: dynamic(() => import('../../src/pages/components/snackbars/snackbars-es.mdx')),
  fr: dynamic(() => import('../../src/pages/components/snackbars/snackbars-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/components/snackbars/snackbars-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/components/snackbars/snackbars-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/components/snackbars/snackbars-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/components/snackbars/snackbars-zh.mdx')),
};

export default function SnackbarsPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}
