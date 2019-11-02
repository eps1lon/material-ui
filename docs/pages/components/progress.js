import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/components/progress/progress.mdx')),
  aa: dynamic(() => import('../../src/pages/components/progress/progress-aa.mdx')),
  de: dynamic(() => import('../../src/pages/components/progress/progress-de.mdx')),
  es: dynamic(() => import('../../src/pages/components/progress/progress-es.mdx')),
  fr: dynamic(() => import('../../src/pages/components/progress/progress-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/components/progress/progress-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/components/progress/progress-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/components/progress/progress-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/components/progress/progress-zh.mdx')),
};

export default function ProgressPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}
