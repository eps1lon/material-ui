import { getContrastRatio, darken, lighten } from './colorManipulator';
import { SimplePaletteColorOptions } from './createPalette';

export type CommonColorCategory = 'surface' | 'background' | 'error';
export type CommonOnColorCategory = 'onSurface' | 'onBackground' | 'onError';
export type SpecialColorCategory = 'divider';
/**
 * categories without different tones
 */
export type SimpleCategory = CommonColorCategory | CommonOnColorCategory | SpecialColorCategory;

export type ColorCategory = 'primary' | 'secondary';
export type OnColorCategory = 'onPrimary' | 'onSecondary';
export type DisabledColorCategory = 'disabledPrimary' | 'disabledSecondary';
/**
 * categories with named tonal offsets
 */
export type SwatchCategory = ColorCategory | OnColorCategory | ColorCategory;

export type ColorVariant = 'light' | 'main' | 'dark';
export type ColorEmphasis = 'high' | 'medium' | 'low';
export type NamedTonalOffset = ColorVariant | ColorCategory;

/**
 * CSS color value
 */
export type Color = string;
export type Colors<K extends keyof any> = Record<K, Color>;

export type ColorTheme = Record<SwatchCategory, Colors<NamedTonalOffset>> & Colors<SimpleCategory>;

function addLightOrDark(
  intent: Color | Partial<Record<ColorVariant, Color>> | any,
  variant: ColorVariant,
  shade: string,
  tonalOffset: number,
) {
  if (!intent[variant]) {
    if (intent.hasOwnProperty(shade)) {
      intent[variant] = intent[shade];
    } else if (variant === 'light') {
      intent.light = lighten(intent.main, tonalOffset);
    } else if (variant === 'dark') {
      intent.dark = darken(intent.main, tonalOffset * 1.5);
    }
  }
}

export interface ColorThemeOptions {
  colors?: { [K in keyof SwatchCategory]?: Color | Colors<NamedTonalOffset> } &
    { [K in keyof SimpleCategory]?: Color };
  tonalOffset?: number;
}

export default function createColorTheme(options: ColorThemeOptions = {}): ColorTheme {
  function getContrastText(background) {
    // Use the same logic as
    // Bootstrap: https://github.com/twbs/bootstrap/blob/1d6e3710dd447de1a200f29e8fa521f8a0908f70/scss/_functions.scss#L59
    // and material-components-web https://github.com/material-components/material-components-web/blob/ac46b8863c4dab9fc22c4c662dc6bd1b65dd652f/packages/mdc-theme/_functions.scss#L54
    const contrastText =
      getContrastRatio(background, dark.text.primary) >= contrastThreshold
        ? dark.text.primary
        : light.text.primary;

    if (process.env.NODE_ENV !== 'production') {
      const contrast = getContrastRatio(background, contrastText);
      warning(
        contrast >= 3,
        [
          `Material-UI: the contrast ratio of ${contrast}:1 for ${contrastText} on ${background}`,
          'falls below the WACG recommended absolute minimum contrast ratio of 3:1.',
          'https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast',
        ].join('\n'),
      );
    }

    return contrastText;
  }

  function augmentColor(color, mainShade = 500, lightShade = 300, darkShade = 700) {
    if (!color.main && color[mainShade]) {
      color.main = color[mainShade];
    }

    if (process.env.NODE_ENV !== 'production' && !color.main) {
      throw new Error(
        [
          'Material-UI: the color provided to augmentColor(color) is invalid.',
          `The color object needs to have a \`main\` property or a \`${mainShade}\` property.`,
        ].join('\n'),
      );
    }

    addLightOrDark(color, 'light', lightShade, tonalOffset);
    addLightOrDark(color, 'dark', darkShade, tonalOffset);
    if (!color.contrastText) {
      color.contrastText = getContrastText(color.main);
    }
  }
}
