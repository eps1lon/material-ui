import deepmerge from 'deepmerge'; // < 1kb payload overhead when lodash/merge is > 3kb.
import warning from 'warning';
import { dangerousVariants } from './typographyMigration';

function round(value) {
  return Math.round(value * 1e5) / 1e5;
}

/**
 * @see @link{https://material.io/design/typography/the-type-system.html}
 * @see @link{https://material.io/design/typography/understanding-typography.html}
 */
export default function createTypography(palette, typography) {
  const {
    fontFamily = '"Roboto", "Helvetica", "Arial", sans-serif',
    // The default font size of the Material Specification.
    fontSize = 14, // px
    fontWeightLight = 300,
    fontWeightRegular = 400,
    fontWeightMedium = 500,
    // Tell Material-UI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize = 16,
    caseAllCaps = {
      textTransform: 'uppercase',
    },
    caseSentence = {
      '&:first-letter': {
        textTransform: 'uppercase',
      },
    },
    useNewVariants = false,
    // Apply the CSS properties to all the variants.
    allVariants,
    ...other
  } = typeof typography === 'function' ? typography(palette) : typography;

  warning(
    Object.keys(other).some(variant => dangerousVariants.includes(variant)),
    'Deprecation Warning: Material-UI: Your are passing a deprecated variant ' +
      'or a variant that will be restyled in the next major release to createTypography. ' +
      'Please read the migration guide.',
  );

  const coef = fontSize / 14;

  const letterSpacingToRem = (tracking, spSize) => {
    return `${(tracking / spSize / htmlFontSize) * coef}rem`;
  };

  const pxToRem = size => {
    return `${(size / htmlFontSize) * coef}rem`;
  };

  const spToRem = size => {
    const spToRemConversionRate = 0.0625;
    return `${(size / htmlFontSize) * coef * spToRemConversionRate}rem`;
  };

  // line height should be proportional to its type size
  const lineHeightToRem = spSize => {
    return spToRem(spSize * 1.4);
  };

  const propertiesForCategory = (weight, size, casing, letterSpacing) => {
    return {
      color: palette.text.primary,
      fontFamily,
      fontSize: spToRem(size),
      fontWeight: weight,
      letterSpacing: letterSpacingToRem(letterSpacing, size),
      lineHeight: lineHeightToRem(size),
      ...casing,
      ...allVariants,
    };
  };

  const utils = { lineHeightToRem, letterSpacingToRem, pxToRem, spToRem };

  /* eslint-disable key-spacing, no-multi-spaces */
  // prettier-ignore
  const newVariants = {
    headline1:  propertiesForCategory(fontWeightLight,   96, caseSentence, -1.5),
    headline2:  propertiesForCategory(fontWeightLight,   60, caseSentence, -0.5),
    headline3:  propertiesForCategory(fontWeightRegular, 48, caseSentence,  0),
    headline4:  propertiesForCategory(fontWeightRegular, 34, caseSentence,  0.25),
    headline5:  propertiesForCategory(fontWeightRegular, 24, caseSentence,  0),
    headline6:  propertiesForCategory(fontWeightMedium,  20, caseSentence,  0.15),
    subtitle1:  propertiesForCategory(fontWeightRegular, 16, caseSentence,  0.15),
    subtitle2:  propertiesForCategory(fontWeightMedium,  14, caseSentence,  0.1),
    body1New:   propertiesForCategory(fontWeightRegular, 16, caseSentence,  0.5),
    body2New:   propertiesForCategory(fontWeightRegular, 14, caseSentence,  0.35),
    buttonNew:  propertiesForCategory(fontWeightMedium,  14, caseAllCaps,   0.75),
    captionNew: propertiesForCategory(fontWeightRegular, 12, caseSentence,  0.5),
    overline:   propertiesForCategory(fontWeightRegular, 10, caseAllCaps,   1.5),
  };
  /* eslint-enable key-spacing, no-multi-spaces */

  const oldVariants = {
    display4: {
      fontSize: pxToRem(112),
      fontWeight: fontWeightLight,
      fontFamily,
      letterSpacing: '-.04em',
      lineHeight: `${round(128 / 112)}em`,
      marginLeft: '-.04em',
      color: palette.text.secondary,
      ...allVariants,
    },
    display3: {
      fontSize: pxToRem(56),
      fontWeight: fontWeightRegular,
      fontFamily,
      letterSpacing: '-.02em',
      lineHeight: `${round(73 / 56)}em`,
      marginLeft: '-.02em',
      color: palette.text.secondary,
      ...allVariants,
    },
    display2: {
      fontSize: pxToRem(45),
      fontWeight: fontWeightRegular,
      fontFamily,
      lineHeight: `${round(51 / 45)}em`,
      marginLeft: '-.02em',
      color: palette.text.secondary,
      ...allVariants,
    },
    display1: {
      fontSize: pxToRem(34),
      fontWeight: fontWeightRegular,
      fontFamily,
      lineHeight: `${round(41 / 34)}em`,
      color: palette.text.secondary,
      ...allVariants,
    },
    headline: {
      fontSize: pxToRem(24),
      fontWeight: fontWeightRegular,
      fontFamily,
      lineHeight: `${round(32.5 / 24)}em`,
      color: palette.text.primary,
      ...allVariants,
    },
    title: {
      fontSize: pxToRem(21),
      fontWeight: fontWeightMedium,
      fontFamily,
      lineHeight: `${round(24.5 / 21)}em`,
      color: palette.text.primary,
      ...allVariants,
    },
    subheading: {
      fontSize: pxToRem(16),
      fontWeight: fontWeightRegular,
      fontFamily,
      lineHeight: `${round(24 / 16)}em`,
      color: palette.text.primary,
      ...allVariants,
    },
    body2: {
      fontSize: pxToRem(14),
      fontWeight: fontWeightMedium,
      fontFamily,
      lineHeight: `${round(24 / 14)}em`,
      color: palette.text.primary,
      ...allVariants,
    },
    body1: {
      fontSize: pxToRem(14),
      fontWeight: fontWeightRegular,
      fontFamily,
      lineHeight: `${round(20.5 / 14)}em`,
      color: palette.text.primary,
      ...allVariants,
    },
    caption: {
      fontSize: pxToRem(12),
      fontWeight: fontWeightRegular,
      fontFamily,
      lineHeight: `${round(16.5 / 12)}em`,
      color: palette.text.secondary,
      ...allVariants,
    },
    button: {
      fontSize: pxToRem(14),
      textTransform: 'uppercase',
      fontWeight: fontWeightMedium,
      fontFamily,
      color: palette.text.primary,
      ...allVariants,
    },
  };

  const overwriteVariants = useNewVariants
    ? {
        body1: newVariants.body1New,
        body2: newVariants.body2New,
        button: newVariants.buttonNew,
        caption: newVariants.captionNew,
      }
    : {};

  return deepmerge(
    // prettier-ignore
    {
      round,
      fontFamily,
      fontSize,
      fontWeightLight,
      fontWeightRegular,
      fontWeightMedium,
      ...oldVariants,
      ...newVariants,
      ...overwriteVariants,
    },
    utils,
    other,
    {
      clone: false, // No need to clone deep
    },
  );
}
