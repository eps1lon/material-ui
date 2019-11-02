
import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/components/popover/popover.mdx')),
  aa: dynamic(() => import('../../src/pages/components/popover/popover-aa.mdx')),
  de: dynamic(() => import('../../src/pages/components/popover/popover-de.mdx')),
  es: dynamic(() => import('../../src/pages/components/popover/popover-es.mdx')),
  fr: dynamic(() => import('../../src/pages/components/popover/popover-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/components/popover/popover-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/components/popover/popover-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/components/popover/popover-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/components/popover/popover-zh.mdx')),
};

export default function PopoverPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}

