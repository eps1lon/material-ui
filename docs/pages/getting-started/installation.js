
import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/getting-started/installation/installation.mdx')),
  aa: dynamic(() => import('../../src/pages/getting-started/installation/installation-aa.mdx')),
  de: dynamic(() => import('../../src/pages/getting-started/installation/installation-de.mdx')),
  es: dynamic(() => import('../../src/pages/getting-started/installation/installation-es.mdx')),
  fr: dynamic(() => import('../../src/pages/getting-started/installation/installation-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/getting-started/installation/installation-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/getting-started/installation/installation-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/getting-started/installation/installation-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/getting-started/installation/installation-zh.mdx')),
};

export default function InstallationPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}

