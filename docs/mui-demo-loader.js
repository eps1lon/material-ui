const path = require('path');

/**
 * transforsm {{ "demo": path, ...options }} into jsx
 * @param {string} content
 */
function muiDemoLoader(content, file) {
  const callback = this.async();

  const imports = ["import Demo from 'docs/src/modules/components/Demo'"];

  const withDemoJSX = content.replace(/{{"demo": ".*?".*?}}/gm, (match, offset) => {
    let demoOptions = null;
    try {
      demoOptions = JSON.parse(match.slice(1, -1));
    } catch (error) {
      throw new Error(`Could not parse '${match}' at ${file}:${offset}`);
    }

    const name = path.basename(demoOptions.demo, '.js');
    const demoIdentifier = `${name}_Demo`;
    const demoSourceIdentifierJS = `${name}_SourceJS`;
    const demoSourceIdentifierTS = `${name}_SourceTS`;

    imports.push(
      `import ${demoIdentifier} from './${name}';`,
      `import ${demoSourceIdentifierJS} from '!!raw-loader!./${name}.js';`,
      `import ${demoSourceIdentifierTS} from '!!raw-loader!./${name}.tsx';`,
    );

    return `
<Demo
  demo={{ raw: ${demoSourceIdentifierJS}, js: ${demoIdentifier} }}
  demoOptions={${JSON.stringify(demoOptions, null, 2)}}
  githubLocation="${demoOptions.demo}"
/>
`;
  });

  const results = `${imports.join('\n')}\n\n${withDemoJSX}`;

  return callback(null, results);
}

module.exports = muiDemoLoader;
