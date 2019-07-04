import React from 'react';
import Demo from './Demo'

const SOURCE_CODE_ROOT_URL = 'https://github.com/mui-org/material-ui/blob/master';

/**
 * Adapter from demo-loader to Demo
 */
export default function MarkdownXDemo({ js, raw, tsx, rawTS, ...demoOptions }) {
  return <Demo demo={{ js, raw, tsx, rawTS }} demoOptions={demoOptions} githubLocation={`${SOURCE_CODE_ROOT_URL}/${demoOptions.demo}`} />;
}
