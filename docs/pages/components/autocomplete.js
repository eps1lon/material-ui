import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/components/autocomplete/autocomplete.mdx')),
  aa: dynamic(() => import('../../src/pages/components/autocomplete/autocomplete-aa.mdx')),
  de: dynamic(() => import('../../src/pages/components/autocomplete/autocomplete-de.mdx')),
  es: dynamic(() => import('../../src/pages/components/autocomplete/autocomplete-es.mdx')),
  fr: dynamic(() => import('../../src/pages/components/autocomplete/autocomplete-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/components/autocomplete/autocomplete-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/components/autocomplete/autocomplete-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/components/autocomplete/autocomplete-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/components/autocomplete/autocomplete-zh.mdx')),
};

export default function AutocompletePage() {
  return <MarkdownXDocs translatedPages={pages} />;
}
