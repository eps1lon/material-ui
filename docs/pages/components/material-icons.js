
import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/components/material-icons/material-icons.mdx')),
  aa: dynamic(() => import('../../src/pages/components/material-icons/material-icons-aa.mdx')),
  de: dynamic(() => import('../../src/pages/components/material-icons/material-icons-de.mdx')),
  es: dynamic(() => import('../../src/pages/components/material-icons/material-icons-es.mdx')),
  fr: dynamic(() => import('../../src/pages/components/material-icons/material-icons-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/components/material-icons/material-icons-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/components/material-icons/material-icons-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/components/material-icons/material-icons-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/components/material-icons/material-icons-zh.mdx')),
};

export default function MaterialIconsPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}

