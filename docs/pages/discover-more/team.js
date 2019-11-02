import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/discover-more/team/team.mdx')),
  aa: dynamic(() => import('../../src/pages/discover-more/team/team-aa.mdx')),
  de: dynamic(() => import('../../src/pages/discover-more/team/team-de.mdx')),
  es: dynamic(() => import('../../src/pages/discover-more/team/team-es.mdx')),
  fr: dynamic(() => import('../../src/pages/discover-more/team/team-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/discover-more/team/team-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/discover-more/team/team-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/discover-more/team/team-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/discover-more/team/team-zh.mdx')),
};

export default function TeamPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}
