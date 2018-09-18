/* eslint-disable import/prefer-default-export */

export function setSuppressWarnings(value) {
  const orig = process.env.MUI_SUPPRESS_DEPRECATION_WARNINGS;
  process.env.MUI_SUPPRESS_DEPRECATION_WARNINGS = value;

  // restore function
  return () => {
    process.env.MUI_SUPPRESS_DEPRECATION_WARNINGS = orig;
  };
}

export function disableWarnings() {
  return setSuppressWarnings(true);
}

export function enableWarnings() {
  // falsy value, setting boolean literal false will convert it to 'false'
  // in the env variable which is true
  return setSuppressWarnings('');
}
