import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/components/popper/popper.mdx')),
  aa: dynamic(() => import('../../src/pages/components/popper/popper-aa.mdx')),
  de: dynamic(() => import('../../src/pages/components/popper/popper-de.mdx')),
  es: dynamic(() => import('../../src/pages/components/popper/popper-es.mdx')),
  fr: dynamic(() => import('../../src/pages/components/popper/popper-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/components/popper/popper-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/components/popper/popper-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/components/popper/popper-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/components/popper/popper-zh.mdx')),
};

export default function PopperPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}
