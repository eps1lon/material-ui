import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/customization/density/density.mdx')),
  aa: dynamic(() => import('../../src/pages/customization/density/density-aa.mdx')),
  de: dynamic(() => import('../../src/pages/customization/density/density-de.mdx')),
  es: dynamic(() => import('../../src/pages/customization/density/density-es.mdx')),
  fr: dynamic(() => import('../../src/pages/customization/density/density-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/customization/density/density-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/customization/density/density-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/customization/density/density-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/customization/density/density-zh.mdx')),
};

export default function DensityPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}
