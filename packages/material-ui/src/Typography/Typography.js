import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import warning from 'warning';
import withStyles from '../styles/withStyles';
import {
  deprecatedVariants,
  nextVariantMapping,
  restyledVariants,
} from '../styles/typographyMigration';
import { capitalize } from '../utils/helpers';

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    display: 'block',
    margin: 0,
  },
  /* Styles applied to the root element if `variant="display4"`. */
  display4: theme.typography.display4,
  /* Styles applied to the root element if `variant="display3"`. */
  display3: theme.typography.display3,
  /* Styles applied to the root element if `variant="display2"`. */
  display2: theme.typography.display2,
  /* Styles applied to the root element if `variant="display1"`. */
  display1: theme.typography.display1,
  /* Styles applied to the root element if `variant="headline"`. */
  headline: theme.typography.headline,
  /* Styles applied to the root element if `variant="title"`. */
  title: theme.typography.title,
  /* Styles applied to the root element if `variant="subheading"`. */
  subheading: theme.typography.subheading,
  /* Styles applied to the root element if `variant="body2"`. */
  body2: theme.typography.body2,
  /* Styles applied to the root element if `variant="body1"`. */
  body1: theme.typography.body1,
  /* Styles applied to the root element if `variant="caption"`. */
  caption: theme.typography.caption,
  /* Styles applied to the root element if `variant="button"`. */
  button: theme.typography.button,
  /* Styles applied to the root element if `variant="headline1"`. */
  headline1: theme.typography.headline1,
  /* Styles applied to the root element if `variant="headline2"`. */
  headline2: theme.typography.headline2,
  /* Styles applied to the root element if `variant="headline3"`. */
  headline3: theme.typography.headline3,
  /* Styles applied to the root element if `variant="headline4"`. */
  headline4: theme.typography.headline4,
  /* Styles applied to the root element if `variant="headline5"`. */
  headline5: theme.typography.headline5,
  /* Styles applied to the root element if `variant="headline6"`. */
  headline6: theme.typography.headline6,
  /* Styles applied to the root element if `variant="subtitle1"`. */
  subtitle1: theme.typography.subtitle1,
  /* Styles applied to the root element if `variant="subtitle2"`. */
  subtitle2: theme.typography.subtitle2,
  /* Styles applied to the root element if `variant="body2" useNextVariants`. */
  body2Next: theme.typography.body2Next,
  /* Styles applied to the root element if `variant="body1" useNextVariants`. */
  body1Next: theme.typography.body1Next,
  /* Styles applied to the root element if `variant="caption" useNextVariants`. */
  captionNext: theme.typography.captionNext,
  /* Styles applied to the root element if `variant="button" useNextVariants`. */
  buttonNext: theme.typography.buttonNext,
  /* Styles applied to the root element if `variant="overline"`. */
  overline: theme.typography.overline,
  /* Styles applied to the root element if `align="left"`. */
  alignLeft: {
    textAlign: 'left',
  },
  /* Styles applied to the root element if `align="center"`. */
  alignCenter: {
    textAlign: 'center',
  },
  /* Styles applied to the root element if `align="right"`. */
  alignRight: {
    textAlign: 'right',
  },
  /* Styles applied to the root element if `align="justify"`. */
  alignJustify: {
    textAlign: 'justify',
  },
  /* Styles applied to the root element if `align="nowrap"`. */
  noWrap: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  /* Styles applied to the root element if `gutterBottom={true}`. */
  gutterBottom: {
    marginBottom: '0.35em',
  },
  /* Styles applied to the root element if `paragraph={true}`. */
  paragraph: {
    marginBottom: 16,
  },
  /* Styles applied to the root element if `color="inherit"`. */
  colorInherit: {
    color: 'inherit',
  },
  /* Styles applied to the root element if `color="primary"`. */
  colorPrimary: {
    color: theme.palette.primary.main,
  },
  /* Styles applied to the root element if `color="secondary"`. */
  colorSecondary: {
    color: theme.palette.secondary.main,
  },
  /* Styles applied to the root element if `color="textPrimary"`. */
  colorTextPrimary: {
    color: theme.palette.text.primary,
  },
  /* Styles applied to the root element if `color="textSecondary"`. */
  colorTextSecondary: {
    color: theme.palette.text.secondary,
  },
  /* Styles applied to the root element if `color="error"`. */
  colorError: {
    color: theme.palette.error.main,
  },
});

function getVariant(variantProp, localUseNextVariants, globalUseNextVariants) {
  if (globalUseNextVariants) {
    return nextVariantMapping(variantProp);
  }
  if (localUseNextVariants && restyledVariants.includes(variantProp)) {
    return `${variantProp}Next`;
  }
  return variantProp;
}

function Typography(props) {
  const {
    align,
    classes,
    className: classNameProp,
    color,
    component: componentProp,
    gutterBottom,
    headlineMapping,
    internal,
    noWrap,
    paragraph,
    theme,
    useNextVariants,
    variant: variantProp,
    ...other
  } = props;

  if (process.env.NODE_ENV !== 'production') {
    const globalUseNextVariants = theme.typography.useNextVariants;

    const isDeprecatedVariant = deprecatedVariants.includes(variantProp);
    if (isDeprecatedVariant) {
      warning(
        internal && globalUseNextVariants,
        'Deprecation Warning: Material-UI: You are using the deprecated typography variant ' +
          `${variantProp} that will be removed in the next major release. ` +
          'Check the migration guide.',
      );
    }

    const isRestyledVariant = restyledVariants.includes(variantProp);
    if (isRestyledVariant) {
      warning(
        internal && (useNextVariants || globalUseNextVariants),
        'Deprecation Warning: Material-UI: You are using the typography variant ' +
          `${variantProp} which will be restyled in the next major release.` +
          'Check the migration guide',
      );
    }
  }

  const variant = getVariant(variantProp, useNextVariants, theme.typography.useNextVariants);

  const className = classNames(
    classes.root,
    classes[variant],
    {
      [classes[`color${capitalize(color)}`]]: color !== 'default',
      [classes.noWrap]: noWrap,
      [classes.gutterBottom]: gutterBottom,
      [classes.paragraph]: paragraph,
      [classes[`align${capitalize(align)}`]]: align !== 'inherit',
    },
    classNameProp,
  );

  const Component = componentProp || (paragraph ? 'p' : headlineMapping[variant]) || 'span';

  return <Component className={className} {...other} />;
}

Typography.propTypes = {
  /**
   * Set the text-align on the component.
   */
  align: PropTypes.oneOf(['inherit', 'left', 'center', 'right', 'justify']),
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css-api) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: PropTypes.oneOf([
    'default',
    'error',
    'inherit',
    'primary',
    'secondary',
    'textPrimary',
    'textSecondary',
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   * By default, it maps the variant to a good default headline component.
   */
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
  /**
   * If `true`, the text will have a bottom margin.
   */
  gutterBottom: PropTypes.bool,
  /**
   * We are empirically mapping the variant property to a range of different DOM element types.
   * For instance, h1 to h6. If you wish to change that mapping, you can provide your own.
   * Alternatively, you can use the `component` property.
   */
  headlineMapping: PropTypes.object,
  /**
   * @internal
   * indicating this Component was used internally by Mui
   */
  internal: PropTypes.bool,
  /**
   * If `true`, the text will not wrap, but instead will truncate with an ellipsis.
   */
  noWrap: PropTypes.bool,
  /**
   * If `true`, the text will have a bottom margin.
   */
  paragraph: PropTypes.bool,
  /**
   * if `true` all variants marked for restyle in the next major
   * will use the new style
   */
  useNextVariants: PropTypes.bool,
  /**
   * Applies the theme typography styles.
   */
  variant: PropTypes.oneOf([
    // new
    'headline1',
    'headline2',
    'headline3',
    'headline4',
    'headline5',
    'headline6',
    'subtitle1',
    'subtitle2',
    'overline',
    // restyled
    'body1',
    'body2',
    'caption',
    'button',
    // deprecated
    'display4',
    'display3',
    'display2',
    'display1',
    'headline',
    'title',
    'subheading',
  ]),
};

Typography.defaultProps = {
  align: 'inherit',
  color: 'default',
  gutterBottom: false,
  headlineMapping: {
    // deprecated
    display4: 'h1',
    display3: 'h1',
    display2: 'h1',
    display1: 'h1',
    headline: 'h1',
    title: 'h2',
    subheading: 'h3',
    // restyled
    body2: 'aside',
    body1: 'p',
    // new
    headline1: 'h1',
    headline2: 'h2',
    headline3: 'h3',
    headline4: 'h4',
    headline5: 'h5',
    headline6: 'h6',
    subtitle1: 'h6',
    subtitle2: 'h6',
  },
  noWrap: false,
  paragraph: false,
  variant: 'body1',
  useNextVariants: false,
};

export default withStyles(styles, { name: 'MuiTypography', withTheme: true })(Typography);
