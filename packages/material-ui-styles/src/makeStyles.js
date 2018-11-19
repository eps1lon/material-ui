import React from 'react';
import { ThemeContext } from './ThemeProvider';
import { StylesContext } from './StylesProvider';
import { attach, update, detach, getClasses } from './withStyles';
import { increment } from './indexCounter';
import getStylesCreator from './getStylesCreator';

// We use the same empty object to ref count the styles that don't need a theme object.
const noopTheme = {};

// Helper to debug
// let id = 0;

function makeStyles(stylesOrCreator, options = {}) {
  const { withTheme = false, name, ...stylesOptions2 } = options;
  const stylesCreator = getStylesCreator(stylesOrCreator);
  const listenToTheme = stylesCreator.themingEnabled || typeof name === 'string' || withTheme;

  const meta = name || 'Hook';

  stylesCreator.options = {
    index: increment(),
    // Use for the global CSS option
    name,
    // Help with debuggability.
    meta,
    classNamePrefix: meta,
  };

  return (props = {}) => {
    const theme = listenToTheme ? React.useContext(ThemeContext) : noopTheme;
    const stylesOptions = {
      ...React.useContext(StylesContext),
      ...stylesOptions2,
    };

    const firstRender = React.useRef(true);
    React.useEffect(() => {
      firstRender.current = false;
    }, []);

    const { current: state } = React.useRef({});

    // Execute synchronously everytime the theme changes.
    React.useMemo(
      () => {
        attach({
          name,
          props,
          state,
          stylesCreator,
          stylesOptions,
          theme,
        });
      },
      [theme],
    );

    React.useEffect(() => {
      if (!firstRender.current) {
        update({
          props,
          state,
          stylesCreator,
          stylesOptions,
          theme,
        });
      }
    });

    // Execute asynchronously everytime the theme changes.
    React.useEffect(
      () => {
        return function cleanup() {
          detach({
            state,
            stylesCreator,
            stylesOptions,
            theme,
          });
        };
      },
      [theme],
    );

    return getClasses({
      classes: props.classes,
      Component: undefined,
      state,
      stylesOptions,
    });
  };
}

export default makeStyles;
