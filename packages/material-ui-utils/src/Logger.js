import React from 'react';
import * as PropTypes from 'prop-types';
import fbWarning from 'warning';

function muiWarning(message) {
  if (React.error) {
    React.error(message);
  } else {
    fbWarning(false, message);
  }
}

function muiDeprecation(message) {
  if (React.warn) {
    React.warn(message);
  } else {
    fbWarning(false, message);
  }
}

const LoggerContext = React.createContext({
  cache: new Set(),
  deprecation: muiDeprecation,
  warning: muiWarning,
});

function useLogger() {
  return React.useContext(LoggerContext);
}

export function useWarning() {
  return useLogger().warning;
}

export function useDeprecation() {
  return useLogger().deprecation;
}

export function useResetCache() {
  return useLogger().resetCache;
}


export function BaseLogger(props) {
  const { children, ...loggerProps } = props;
  const loggerContext = useLogger();
  const { cache, deprecation, warning } = Object.assign({}, loggerContext, loggerProps);
  const resetCache = React.useCallback(() => cache.clear(), [cache]);
  const contextValue = React.useMemo(() => ({ cache, deprecation, resetCache, warning }), [
    cache,
    deprecation,
    resetCache,
    warning,
  ]);

  return <LoggerContext.Provider value={contextValue}>{children}</LoggerContext.Provider>;
}

BaseLogger.propTypes = {
  cache: PropTypes.object,
  children: PropTypes.node,
  deprecation: PropTypes.func,
  warning: PropTypes.func,
};

function noop() {}

export function Logger(props) {
  const { disableDeprecations, disableWarnings, children } = props;

  const warning = disableWarnings ? noop : undefined;
  const deprecation = disableDeprecations ? noop : undefined;

  return (
    <BaseLogger deprecation={deprecation} warning={warning}>
      {children}
    </BaseLogger>
  );
}

Logger.propTypes = {
  children: PropTypes.node,
  disableDeprecations: PropTypes.bool,
  disableWarnings: PropTypes.bool,
};
