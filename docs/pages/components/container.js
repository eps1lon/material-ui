
import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/components/container/container.mdx')),
  aa: dynamic(() => import('../../src/pages/components/container/container-aa.mdx')),
  de: dynamic(() => import('../../src/pages/components/container/container-de.mdx')),
  es: dynamic(() => import('../../src/pages/components/container/container-es.mdx')),
  fr: dynamic(() => import('../../src/pages/components/container/container-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/components/container/container-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/components/container/container-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/components/container/container-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/components/container/container-zh.mdx')),
};

export default function ContainerPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}

