const fs = require('fs');

module.exports = function loadDemos(src) {
  return src.replace(/<MarkdownXDemo demo="([^"]+)"/g, function(match, demoPath) {
    const jsPath = demoPath;
    const tsPath = jsPath.replace(/(\.js)?$/, '.tsx');
    const hasTSVersion = fs.existsSync(require.resolve(tsPath));

    const demo = demoPath;
    const js = `require('${jsPath}').default`;
    const tsx = hasTSVersion ? `require('${tsPath}').default` : undefined;
    const raw = fs.readFileSync(require.resolve(jsPath), { encoding: 'utf8' });
    const rawTS = hasTSVersion
      ? fs.readFileSync(require.resolve(tsPath), { encoding: 'utf8' })
      : undefined;
    const githubLocation = '';

    return `<MarkdownXDemo demo="${demo}" githubLocation="${githubLocation}" js={${js}} raw={${JSON.stringify(raw)}} tsx={${tsx}} rawTS={${JSON.stringify(rawTS)}}`;
  });
};
