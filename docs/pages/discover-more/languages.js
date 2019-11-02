import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/discover-more/languages/languages.mdx')),
  aa: dynamic(() => import('../../src/pages/discover-more/languages/languages-aa.mdx')),
  de: dynamic(() => import('../../src/pages/discover-more/languages/languages-de.mdx')),
  es: dynamic(() => import('../../src/pages/discover-more/languages/languages-es.mdx')),
  fr: dynamic(() => import('../../src/pages/discover-more/languages/languages-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/discover-more/languages/languages-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/discover-more/languages/languages-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/discover-more/languages/languages-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/discover-more/languages/languages-zh.mdx')),
};

export default function LanguagesPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}
