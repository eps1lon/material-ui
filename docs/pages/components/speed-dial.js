import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/components/speed-dial/speed-dial.mdx')),
  aa: dynamic(() => import('../../src/pages/components/speed-dial/speed-dial-aa.mdx')),
  de: dynamic(() => import('../../src/pages/components/speed-dial/speed-dial-de.mdx')),
  es: dynamic(() => import('../../src/pages/components/speed-dial/speed-dial-es.mdx')),
  fr: dynamic(() => import('../../src/pages/components/speed-dial/speed-dial-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/components/speed-dial/speed-dial-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/components/speed-dial/speed-dial-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/components/speed-dial/speed-dial-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/components/speed-dial/speed-dial-zh.mdx')),
};

export default function SpeedDialPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}
