const fm = require('front-matter');

module.exports = async function frontMatterLoader(content) {
  const callback = this.async();

  const output = fm(content);
  const attributes = Object.entries(output.attributes).map(([key, value]) => {
    return `export const ${key} = ${JSON.stringify(value)}`;
  });

  const results = `${output.body}\n\n${attributes.join('\n\n')}\n`;

  return callback(null, results);
};
