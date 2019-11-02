import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/components/portal/portal.mdx')),
  aa: dynamic(() => import('../../src/pages/components/portal/portal-aa.mdx')),
  de: dynamic(() => import('../../src/pages/components/portal/portal-de.mdx')),
  es: dynamic(() => import('../../src/pages/components/portal/portal-es.mdx')),
  fr: dynamic(() => import('../../src/pages/components/portal/portal-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/components/portal/portal-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/components/portal/portal-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/components/portal/portal-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/components/portal/portal-zh.mdx')),
};

export default function PortalPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}
