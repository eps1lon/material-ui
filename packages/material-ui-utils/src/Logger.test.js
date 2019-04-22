import React from 'react';
import { stub } from 'sinon';
import { createMount } from '@material-ui/core/test-utils';
import consoleErrorMock from 'test-utils/consoleErrorMock';
import { Logger, useResetCache, useDeprecation, useWarning } from './Logger';

describe('Logger', () => {
  let mount;
  function Test({ children }) {
    // render side-effect, basically a beforeEach mocha-hook
    useResetCache()();

    return children;
  }

  before(() => {
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  beforeEach(() => {
    consoleErrorMock.spy();
  });

  afterEach(() => {
    consoleErrorMock.reset();
  });

  describe('useWarning', () => {
    it('warns with console.error', () => {});

    it('uses React.error if available', () => {
      // leaky if test failed but I'm being stubborn. describe just because I need cleanup is an Anti-Pattern
      const error = stub(React, 'error');

      error.restore();
    });
  });

  describe('useDeprecation', () => {
    it('logs deprecation warnings with console.warn', () => {});

    it('uses React.warn if available', () => {
      const warn = stub(React, 'warn');

      warn.restore();
    });
  });
});
