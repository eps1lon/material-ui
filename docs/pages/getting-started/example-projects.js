import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() =>
    import('../../src/pages/getting-started/example-projects/example-projects.mdx'),
  ),
  aa: dynamic(() =>
    import('../../src/pages/getting-started/example-projects/example-projects-aa.mdx'),
  ),
  de: dynamic(() =>
    import('../../src/pages/getting-started/example-projects/example-projects-de.mdx'),
  ),
  es: dynamic(() =>
    import('../../src/pages/getting-started/example-projects/example-projects-es.mdx'),
  ),
  fr: dynamic(() =>
    import('../../src/pages/getting-started/example-projects/example-projects-fr.mdx'),
  ),
  ja: dynamic(() =>
    import('../../src/pages/getting-started/example-projects/example-projects-ja.mdx'),
  ),
  pt: dynamic(() =>
    import('../../src/pages/getting-started/example-projects/example-projects-pt.mdx'),
  ),
  ru: dynamic(() =>
    import('../../src/pages/getting-started/example-projects/example-projects-ru.mdx'),
  ),
  zh: dynamic(() =>
    import('../../src/pages/getting-started/example-projects/example-projects-zh.mdx'),
  ),
};

export default function ExampleProjectsPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}
