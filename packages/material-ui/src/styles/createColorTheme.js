import common from '../colors/common';
import pink from '../colors/pink';
import purple from '../colors/purple';
import teal from '../colors/teal';

const defaultColorThemeOptions = {
  primary: purple,
  onPrimary: {
    light: common.black,
    baseline: common.white,
    dark: common.white,
  },
  secondary: teal,
  onSecondary: {
    light: common.black,
    baseline: common.white,
    dark: common.white,
  },
  background: common.white,
  onBackground: common.black,
  error: pink.A700,
  onError: common.white,
  surface: common.white,
  onSurface: common.black,
};

function addLightOrDark(intent, direction, shade, tonalOffset) {
  if (!intent[direction]) {
    if (intent.hasOwnProperty(shade)) {
      intent[direction] = intent[shade];
    } else if (direction === 'light') {
      intent.light = lighten(intent.main, tonalOffset);
    } else if (direction === 'dark') {
      intent.dark = darken(intent.main, tonalOffset * 1.5);
    }
  }
}

export default function createColorTheme(options = {}) {
  const { background = defaultColorThemeOptions.background, error = {}, surface = {} } = options;
}
