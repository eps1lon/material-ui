import React from 'react';
import MarkdownXDocs from 'docs/src/modules/components/MarkdownXDocs';
import dynamic from 'next/dynamic';

const pages = {
  en: dynamic(() => import('../../src/pages/components/textarea-autosize/textarea-autosize.mdx')),
  aa: dynamic(() =>
    import('../../src/pages/components/textarea-autosize/textarea-autosize-aa.mdx'),
  ),
  de: dynamic(() =>
    import('../../src/pages/components/textarea-autosize/textarea-autosize-de.mdx'),
  ),
  es: dynamic(() =>
    import('../../src/pages/components/textarea-autosize/textarea-autosize-es.mdx'),
  ),
  fr: dynamic(() =>
    import('../../src/pages/components/textarea-autosize/textarea-autosize-fr.mdx'),
  ),
  ja: dynamic(() =>
    import('../../src/pages/components/textarea-autosize/textarea-autosize-ja.mdx'),
  ),
  pt: dynamic(() =>
    import('../../src/pages/components/textarea-autosize/textarea-autosize-pt.mdx'),
  ),
  ru: dynamic(() =>
    import('../../src/pages/components/textarea-autosize/textarea-autosize-ru.mdx'),
  ),
  zh: dynamic(() =>
    import('../../src/pages/components/textarea-autosize/textarea-autosize-zh.mdx'),
  ),
};

export default function TextareaAutosizePage() {
  return <MarkdownXDocs translatedPages={pages} />;
}
