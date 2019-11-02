import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() =>
    import('../../src/pages/getting-started/supported-platforms/supported-platforms.mdx'),
  ),
  aa: dynamic(() =>
    import('../../src/pages/getting-started/supported-platforms/supported-platforms-aa.mdx'),
  ),
  de: dynamic(() =>
    import('../../src/pages/getting-started/supported-platforms/supported-platforms-de.mdx'),
  ),
  es: dynamic(() =>
    import('../../src/pages/getting-started/supported-platforms/supported-platforms-es.mdx'),
  ),
  fr: dynamic(() =>
    import('../../src/pages/getting-started/supported-platforms/supported-platforms-fr.mdx'),
  ),
  ja: dynamic(() =>
    import('../../src/pages/getting-started/supported-platforms/supported-platforms-ja.mdx'),
  ),
  pt: dynamic(() =>
    import('../../src/pages/getting-started/supported-platforms/supported-platforms-pt.mdx'),
  ),
  ru: dynamic(() =>
    import('../../src/pages/getting-started/supported-platforms/supported-platforms-ru.mdx'),
  ),
  zh: dynamic(() =>
    import('../../src/pages/getting-started/supported-platforms/supported-platforms-zh.mdx'),
  ),
};

export default function SupportedPlatformsPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}
