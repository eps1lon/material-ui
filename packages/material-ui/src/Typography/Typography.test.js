import React from 'react';
import { assert } from 'chai';
import { mock } from 'sinon';
import createMuiTheme from '../styles/createMuiTheme';
import { createMount, createShallow, getClasses } from '../test-utils';
import Typography from './Typography';
import { before } from 'mocha';

describe('<Typography />', () => {
  let shallow;
  let classes;
  let v2Classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<Typography>Hello</Typography>);
    v2Classes = getClasses(
      <Typography
        theme={createMuiTheme({ typography: { useNextVariants: true } })}
        internal
        variant="display4"
      />,
    );
  });

  it('should render the text', () => {
    const wrapper = shallow(<Typography>Hello</Typography>);
    assert.strictEqual(wrapper.childAt(0).equals('Hello'), true);
  });

  it('should spread props', () => {
    const wrapper = shallow(<Typography data-test="hello">Hello</Typography>);
    assert.strictEqual(wrapper.props()['data-test'], 'hello');
  });

  it('should render body1 root by default', () => {
    const wrapper = shallow(<Typography>Hello</Typography>);
    assert.strictEqual(wrapper.hasClass(classes.body1), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should merge user classes', () => {
    const wrapper = shallow(<Typography className="woofTypography">Hello</Typography>);
    assert.strictEqual(wrapper.hasClass(classes.body1), true);
    assert.strictEqual(wrapper.hasClass('woofTypography'), true);
  });

  it('should center text', () => {
    const wrapper = shallow(
      <Typography align="center" className="woofTypography">
        Hello
      </Typography>,
    );
    assert.strictEqual(wrapper.hasClass(classes.alignCenter), true);
  });
  [
    'display4',
    'display3',
    'display2',
    'display1',
    'headline',
    'title',
    'subheading',
    'body2',
    'body1',
    'caption',
    'button',
  ].forEach(variant => {
    it(`should render ${variant} text`, () => {
      const wrapper = shallow(<Typography variant={variant}>Hello</Typography>);
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
      const wrapper = shallow(<Typography color={color}>Hello</Typography>);
      assert.ok(classes[className] !== undefined);
      assert.strictEqual(wrapper.hasClass(classes[className]), true, `should be ${color} text`);
    });
  });

  describe('prop: color', () => {
    it('should inherit the color', () => {
      const wrapper = shallow(<Typography color="inherit">Hello</Typography>);
      assert.strictEqual(wrapper.hasClass(classes.colorInherit), true);
    });
  });

  describe('headline', () => {
    it('should render a span by default', () => {
      const wrapper = shallow(<Typography variant="button">Hello</Typography>);
      assert.strictEqual(wrapper.name(), 'span');
    });

    it('should render a p with a paragraph', () => {
      const wrapper = shallow(<Typography paragraph>Hello</Typography>);
      assert.strictEqual(wrapper.name(), 'p');
    });

    it('should render the mapped headline', () => {
      const wrapper = shallow(<Typography variant="title">Hello</Typography>);
      assert.strictEqual(wrapper.name(), 'h2');
    });

    it('should render a h1', () => {
      const wrapper = shallow(<Typography component="h1">Hello</Typography>);
      assert.strictEqual(wrapper.name(), 'h1');
    });
  });

  describe('v2 migration', () => {
    const mount = createMount();
    const v2Theme = createMuiTheme({
      typography: {
        useNextVariants: true,
      },
    });
    let warning;

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
        assert.isTrue(warning.calledOnce);
        assert.include(warning.firstCall.args[0], expectedWarning);
      }
    };

    it('should warn on deprecated variant usage', () => {
      testMount(<Typography variant="display4" />, true);
      testMount(<Typography internal variant="display4" />, true);
      testMount(<Typography internal useNextVariants variant="display4" />, true);
    });

    it('warns on restyle variant usage', () => {
      testMount(<Typography variant="body1" />, true);
      testMount(<Typography internal variant="body1" />, true);
    });

    describe('prop: useNextVariants', () => {
      it('can use the new style of existing variants', () => {
        testMount(<Typography useNextVariants variant="body1" />, false);
        testMount(<Typography internal useNextVariants variant="body1" />, false);
      });
    });

    describe('theme.typography.useNextVariants', () => {
      it('maps internal deprecated variants', () => {
        testMount(<Typography theme={v2Theme} internal variant="display4" />, false);
        testMount(
          <Typography theme={v2Theme} internal useNextVariants variant="display4" />,
          false,
        );

        const v2Typography = <Typography theme={v2Theme} internal variant="display4" />;
        const wrapper = shallow(v2Typography);
        assert.isTrue(wrapper.hasClass(v2Classes.headline1));
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
