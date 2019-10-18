import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const Pages = {
  en: dynamic(() => import(`../../src/pages/components/app-bar/app-bar.mdx`)),
  de: dynamic(() => import(`../../src/pages/components/app-bar/app-bar-de.mdx`)),
};

export default function AppBarPage(props) {
  const {
    reduxServerState: {
      options: { userLanguage = 'en' },
    },
  } = props;

  const Page = Pages[userLanguage] || Pages.en;

  return (
    <MarkdownXDocs>
      <Page />
    </MarkdownXDocs>
  );
}
