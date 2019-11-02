import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() =>
    import('../../src/pages/guides/minimizing-bundle-size/minimizing-bundle-size.mdx'),
  ),
  aa: dynamic(() =>
    import('../../src/pages/guides/minimizing-bundle-size/minimizing-bundle-size-aa.mdx'),
  ),
  de: dynamic(() =>
    import('../../src/pages/guides/minimizing-bundle-size/minimizing-bundle-size-de.mdx'),
  ),
  es: dynamic(() =>
    import('../../src/pages/guides/minimizing-bundle-size/minimizing-bundle-size-es.mdx'),
  ),
  fr: dynamic(() =>
    import('../../src/pages/guides/minimizing-bundle-size/minimizing-bundle-size-fr.mdx'),
  ),
  ja: dynamic(() =>
    import('../../src/pages/guides/minimizing-bundle-size/minimizing-bundle-size-ja.mdx'),
  ),
  pt: dynamic(() =>
    import('../../src/pages/guides/minimizing-bundle-size/minimizing-bundle-size-pt.mdx'),
  ),
  ru: dynamic(() =>
    import('../../src/pages/guides/minimizing-bundle-size/minimizing-bundle-size-ru.mdx'),
  ),
  zh: dynamic(() =>
    import('../../src/pages/guides/minimizing-bundle-size/minimizing-bundle-size-zh.mdx'),
  ),
};

export default function MinimizingBundleSizePage() {
  return <MarkdownXDocs translatedPages={pages} />;
}
