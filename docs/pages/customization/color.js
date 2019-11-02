import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/customization/color/color.mdx')),
  aa: dynamic(() => import('../../src/pages/customization/color/color-aa.mdx')),
  de: dynamic(() => import('../../src/pages/customization/color/color-de.mdx')),
  es: dynamic(() => import('../../src/pages/customization/color/color-es.mdx')),
  fr: dynamic(() => import('../../src/pages/customization/color/color-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/customization/color/color-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/customization/color/color-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/customization/color/color-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/customization/color/color-zh.mdx')),
};

export default function ColorPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}
