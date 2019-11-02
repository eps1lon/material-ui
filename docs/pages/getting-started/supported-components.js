
import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/getting-started/supported-components/supported-components.mdx')),
  aa: dynamic(() => import('../../src/pages/getting-started/supported-components/supported-components-aa.mdx')),
  de: dynamic(() => import('../../src/pages/getting-started/supported-components/supported-components-de.mdx')),
  es: dynamic(() => import('../../src/pages/getting-started/supported-components/supported-components-es.mdx')),
  fr: dynamic(() => import('../../src/pages/getting-started/supported-components/supported-components-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/getting-started/supported-components/supported-components-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/getting-started/supported-components/supported-components-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/getting-started/supported-components/supported-components-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/getting-started/supported-components/supported-components-zh.mdx')),
};

export default function SupportedComponentsPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}

