
import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/guides/responsive-ui/responsive-ui.mdx')),
  aa: dynamic(() => import('../../src/pages/guides/responsive-ui/responsive-ui-aa.mdx')),
  de: dynamic(() => import('../../src/pages/guides/responsive-ui/responsive-ui-de.mdx')),
  es: dynamic(() => import('../../src/pages/guides/responsive-ui/responsive-ui-es.mdx')),
  fr: dynamic(() => import('../../src/pages/guides/responsive-ui/responsive-ui-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/guides/responsive-ui/responsive-ui-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/guides/responsive-ui/responsive-ui-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/guides/responsive-ui/responsive-ui-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/guides/responsive-ui/responsive-ui-zh.mdx')),
};

export default function ResponsiveUiPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}

