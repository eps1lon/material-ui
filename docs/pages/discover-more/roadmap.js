import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/discover-more/roadmap/roadmap.mdx')),
};

export default function RoadmapPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}
