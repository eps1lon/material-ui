import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import(`../../src/pages/components/app-bar/app-bar.mdx`)),
  de: dynamic(() => import(`../../src/pages/components/app-bar/app-bar-de.mdx`)),
};

export default function AppBarPage(props) {
  return <MarkdownXDocs {...props} translatedPages={pages} />;
}
