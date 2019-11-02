
import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/components/breadcrumbs/breadcrumbs.mdx')),
  aa: dynamic(() => import('../../src/pages/components/breadcrumbs/breadcrumbs-aa.mdx')),
  de: dynamic(() => import('../../src/pages/components/breadcrumbs/breadcrumbs-de.mdx')),
  es: dynamic(() => import('../../src/pages/components/breadcrumbs/breadcrumbs-es.mdx')),
  fr: dynamic(() => import('../../src/pages/components/breadcrumbs/breadcrumbs-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/components/breadcrumbs/breadcrumbs-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/components/breadcrumbs/breadcrumbs-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/components/breadcrumbs/breadcrumbs-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/components/breadcrumbs/breadcrumbs-zh.mdx')),
};

export default function BreadcrumbsPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}

