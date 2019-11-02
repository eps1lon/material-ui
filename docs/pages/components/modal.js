import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/components/modal/modal.mdx')),
  aa: dynamic(() => import('../../src/pages/components/modal/modal-aa.mdx')),
  de: dynamic(() => import('../../src/pages/components/modal/modal-de.mdx')),
  es: dynamic(() => import('../../src/pages/components/modal/modal-es.mdx')),
  fr: dynamic(() => import('../../src/pages/components/modal/modal-fr.mdx')),
  ja: dynamic(() => import('../../src/pages/components/modal/modal-ja.mdx')),
  pt: dynamic(() => import('../../src/pages/components/modal/modal-pt.mdx')),
  ru: dynamic(() => import('../../src/pages/components/modal/modal-ru.mdx')),
  zh: dynamic(() => import('../../src/pages/components/modal/modal-zh.mdx')),
};

export default function ModalPage() {
  return <MarkdownXDocs translatedPages={pages} />;
}
