
import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/components/click-away-listener/click-away-listener.mdx')),
  aa: dynamic(() => import('../../src/pages/components/click-away-listener/click-away-listener-aa.mdx')),
  de: dynamic(() => import('../../src/pages/components/click-away-listener/click-away-listener-de.mdx')),
  es: dynamic(() => import('../../src/pages/components/click-away-listener/click-away-listener-es.mdx')),
  fr: dynamic(() => import('../../src/pages/components/click-away-listener/click-away-listener-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/components/click-away-listener/click-away-listener-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/components/click-away-listener/click-away-listener-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/components/click-away-listener/click-away-listener-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/components/click-away-listener/click-away-listener-zh.mdx')),
};

export default function ClickAwayListenerPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}

