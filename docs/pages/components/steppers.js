
import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/components/steppers/steppers.mdx')),
  aa: dynamic(() => import('../../src/pages/components/steppers/steppers-aa.mdx')),
  de: dynamic(() => import('../../src/pages/components/steppers/steppers-de.mdx')),
  es: dynamic(() => import('../../src/pages/components/steppers/steppers-es.mdx')),
  fr: dynamic(() => import('../../src/pages/components/steppers/steppers-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/components/steppers/steppers-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/components/steppers/steppers-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/components/steppers/steppers-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/components/steppers/steppers-zh.mdx')),
};

export default function SteppersPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}

