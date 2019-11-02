import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/system/palette/palette.mdx')),
  aa: dynamic(() => import('../../src/pages/system/palette/palette-aa.mdx')),
  de: dynamic(() => import('../../src/pages/system/palette/palette-de.mdx')),
  es: dynamic(() => import('../../src/pages/system/palette/palette-es.mdx')),
  fr: dynamic(() => import('../../src/pages/system/palette/palette-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/system/palette/palette-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/system/palette/palette-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/system/palette/palette-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/system/palette/palette-zh.mdx')),
};

export default function PalettePage() {
  return <MarkdownXDocs translatedPages={pages} />;
}
