export default function mapTranslations(req, ext) {
  const translations = {};
  function load(filename) {
    // .md is required by raw-loader which uses ES6 modules
    const esModuleRequire = ext === 'md';
    if (esModuleRequire) {
      return req(filename).default;
    }
    return req(filename);
  }
  req.keys().forEach(filename => {
    const match = filename.match(new RegExp(`-([a-z]{2}).${ext}$`));

    if (match) {
      translations[match[1]] = load(filename);
    } else {
      translations.en = load(filename);
    }
  });
  return translations;
}
