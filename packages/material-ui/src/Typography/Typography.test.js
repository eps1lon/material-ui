import React from 'react';
import { assert } from 'chai';
import { mock } from 'sinon';
import createMuiTheme from '../styles/createMuiTheme';
import {
  createMount,
  createShallow,
  getClasses,
  enableWarnings,
  disableWarnings,
} from '../test-utils';
import Typography from './Typography';
import { before } from 'mocha';

describe('<Typography />', () => {
  let shallow;
  let classes;
  let v2Theme;

  before(() => {
    shallow = createShallow({ dive: true });
    v2Theme = createMuiTheme({
      typography: {
        useNextVariants: true,
      },
    });
    classes = getClasses(<Typography theme={v2Theme} />);
  });

  it('should render the text', () => {
    const wrapper = shallow(<Typography useNextVariants>Hello</Typography>);
    assert.strictEqual(wrapper.childAt(0).equals('Hello'), true);
  });

  it('should spread props', () => {
    const wrapper = shallow(
      <Typography data-test="hello" useNextVariants>
        Hello
      </Typography>,
    );
    assert.strictEqual(wrapper.props()['data-test'], 'hello');
  });

  it('should render body1 root by default', () => {
    const wrapper = shallow(<Typography theme={v2Theme}>Hello</Typography>);
    assert.strictEqual(wrapper.hasClass(classes.body1), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should merge user classes', () => {
    const wrapper = shallow(
      <Typography className="woofTypography" theme={v2Theme}>
        Hello
      </Typography>,
    );
    assert.strictEqual(wrapper.hasClass(classes.body1), true);
    assert.strictEqual(wrapper.hasClass('woofTypography'), true);
  });

  it('should center text', () => {
    const wrapper = shallow(
      <Typography align="center" className="woofTypography" useNextVariants>
        Hello
      </Typography>,
    );
    assert.strictEqual(wrapper.hasClass(classes.alignCenter), true);
  });
  [
    'headline1',
    'headline2',
    'headline3',
    'headline4',
    'headline5',
    'headline6',
    'subtitle1',
    'body2',
    'body1',
    'caption',
    'button',
  ].forEach(variant => {
    it(`should render ${variant} text`, () => {
      const wrapper = shallow(
        <Typography theme={v2Theme} variant={variant} useNextVariants>
          Hello
        </Typography>,
      );
      assert.ok(classes[variant] !== undefined);
      assert.strictEqual(wrapper.hasClass(classes[variant]), true, `should be ${variant} text`);
    });
  });

  [
    ['primary', 'colorPrimary'],
    ['textSecondary', 'colorTextSecondary'],
    ['secondary', 'colorSecondary'],
    ['inherit', 'colorInherit'],
    ['error', 'colorError'],
  ].forEach(([color, className]) => {
    it(`should render ${color} color`, () => {
      const wrapper = shallow(
        <Typography color={color} useNextVariants>
          Hello
        </Typography>,
      );
      assert.ok(classes[className] !== undefined);
      assert.strictEqual(wrapper.hasClass(classes[className]), true, `should be ${color} text`);
    });
  });

  describe('prop: color', () => {
    it('should inherit the color', () => {
      const wrapper = shallow(
        <Typography color="inherit" useNextVariants>
          Hello
        </Typography>,
      );
      assert.strictEqual(wrapper.hasClass(classes.colorInherit), true);
    });
  });

  describe('headline', () => {
    it('should render a span by default', () => {
      const wrapper = shallow(
        <Typography variant="button" useNextVariants>
          Hello
        </Typography>,
      );
      assert.strictEqual(wrapper.name(), 'span');
    });

    it('should render a p with a paragraph', () => {
      const wrapper = shallow(
        <Typography paragraph useNextVariants>
          Hello
        </Typography>,
      );
      assert.strictEqual(wrapper.name(), 'p');
    });

    it('should render the mapped headline', () => {
      const wrapper = shallow(<Typography variant="headline6">Hello</Typography>);
      assert.strictEqual(wrapper.name(), 'h6');
    });

    it('should render a h1', () => {
      const wrapper = shallow(
        <Typography component="h1" useNextVariants>
          Hello
        </Typography>,
      );
      assert.strictEqual(wrapper.name(), 'h1');
    });
  });

  describe('v2 migration', () => {
    const mount = createMount();
    let warning;
    let restoreSuppressWarningEnv = () => {};

    before(() => {
      restoreSuppressWarningEnv = enableWarnings();
    });

    after(() => {
      restoreSuppressWarningEnv();
    });

    beforeEach(() => {
      warning = mock(console).expects('error');
    });

    afterEach(() => {
      warning.restore();
    });

    /**
     * tests if a warning is issued from the `warning` module when mounting {component}
     */
    const testMount = (component, expectDeprecation) => {
      const expectedWarning = expectDeprecation ? 'Deprecation Warning: Material-UI:' : undefined;
      warning.resetHistory();

      try {
        const wrapper = mount(component);
        wrapper.unmount();

        if (expectedWarning) {
          assert.fail('got no error', `expected a warning to match '${expectedWarning}'`);
        }
      } catch (e) {
        assert.isTrue(expectDeprecation, 'expected no deprecation but got a warning anyway');
        assert.isTrue(warning.calledOnce, 'expected deprecation warning but got none');
        assert.include(warning.firstCall.args[0], expectedWarning);
      }
    };

    it('should warn on deprecated variant usage', () => {
      testMount(<Typography variant="display4" />, true);
      testMount(<Typography useNextVariants variant="display4" />, true);
    });

    it('warns on restyle variant usage', () => {
      testMount(<Typography variant="body1" />, true);
    });

    describe('prop: useNextVariants', () => {
      it('can use the new style of existing variants', () => {
        testMount(<Typography useNextVariants />, false);
        testMount(<Typography useNextVariants variant="body1" />, false);
      });

      it('respects headlineMapping', () => {
        const wrapper = shallow(<Typography headlineMapping={{ body1: 'div' }} useNextVariants />);
        assert.strictEqual(wrapper.name(), 'div');
      });
    });

    describe('theme.typography.useNextVariants', () => {
      describe('with SUPPRESS_DEPRACATION_WARNINGS', () => {
        let restoreEnv = () => {};

        before(() => {
          restoreEnv = disableWarnings();
        });

        after(() => {
          restoreEnv();
        });

        it('causes mui to not log deprecation warnings', () => {
          testMount(<Typography theme={v2Theme} variant="display4" />, false);
          testMount(<Typography theme={v2Theme} useNextVariants variant="display4" />, false);
        });

        it('maps internal deprecated variants', () => {
          const v2Typography = <Typography theme={v2Theme} variant="display4" />;
          const wrapper = shallow(v2Typography);
          assert.isTrue(wrapper.hasClass(classes.headline1));
        });
      });

      it('will still warn if you use them in your app', () => {
        testMount(<Typography theme={v2Theme} variant="display4" />, true);
      });

      it('suppresses warnings for restyled variants', () => {
        testMount(<Typography theme={v2Theme} variant="body1" />, false);
      });
    });
  });
});
