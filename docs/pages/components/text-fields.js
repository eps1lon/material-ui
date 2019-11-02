import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/components/text-fields/text-fields.mdx')),
  aa: dynamic(() => import('../../src/pages/components/text-fields/text-fields-aa.mdx')),
  de: dynamic(() => import('../../src/pages/components/text-fields/text-fields-de.mdx')),
  es: dynamic(() => import('../../src/pages/components/text-fields/text-fields-es.mdx')),
  fr: dynamic(() => import('../../src/pages/components/text-fields/text-fields-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/components/text-fields/text-fields-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/components/text-fields/text-fields-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/components/text-fields/text-fields-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/components/text-fields/text-fields-zh.mdx')),
};

export default function TextFieldsPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}
