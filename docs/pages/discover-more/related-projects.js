import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/discover-more/related-projects/related-projects.mdx')),
  aa: dynamic(() =>
    import('../../src/pages/discover-more/related-projects/related-projects-aa.mdx'),
  ),
  de: dynamic(() =>
    import('../../src/pages/discover-more/related-projects/related-projects-de.mdx'),
  ),
  es: dynamic(() =>
    import('../../src/pages/discover-more/related-projects/related-projects-es.mdx'),
  ),
  fr: dynamic(() =>
    import('../../src/pages/discover-more/related-projects/related-projects-fr.mdx'),
  ),
  ja: dynamic(() =>
    import('../../src/pages/discover-more/related-projects/related-projects-ja.mdx'),
  ),
  pt: dynamic(() =>
    import('../../src/pages/discover-more/related-projects/related-projects-pt.mdx'),
  ),
  ru: dynamic(() =>
    import('../../src/pages/discover-more/related-projects/related-projects-ru.mdx'),
  ),
  zh: dynamic(() =>
    import('../../src/pages/discover-more/related-projects/related-projects-zh.mdx'),
  ),
};

export default function RelatedProjectsPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}
