import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { cloneElementWithClassName, isMuiElement, setRef } from './reactHelpers';
import { createShallow } from '../test-utils';
import { Input, ListItemAvatar, ListItemSecondaryAction, SvgIcon } from '..';

describe('utils/reactHelpers.js', () => {
  describe('cloneElementWithClassName', () => {
    let shallow;

    before(() => {
      shallow = createShallow();
    });

    it('adds an empty className with no arg', () => {
      const element = <div id="my-element" />;
      const cloned = cloneElementWithClassName(element);

      assert.deepEqual(
        {
          ...shallow(element).props(),
          className: '',
        },
        shallow(cloned).props(),
      );
    });

    it('appends the className to the existing className', () => {
      const element = <div id="my-element" className="first second" />;
      const cloned = cloneElementWithClassName(element, 'third');

      const props = shallow(element).props();
      const clonedProps = shallow(cloned).props();

      assert.strictEqual(props.id, clonedProps.id);
      assert.strictEqual(clonedProps.className, 'first second third');
    });

    it('can merge additional props', () => {
      const element = <div id="my-element" className="first second" data-test="fail" />;
      const cloned = cloneElementWithClassName(element, 'third', {
        'data-test': 'pass',
        className: 'overridden',
      });

      const props = shallow(element).props();
      const clonedProps = shallow(cloned).props();

      assert.strictEqual(props.id, clonedProps.id);
      assert.strictEqual(clonedProps.className, 'first second third');
      assert.strictEqual(clonedProps['data-test'], 'pass');
    });
  });

  describe('isMuiElement', () => {
    it('should match static muiName property', () => {
      const Component = () => null;
      Component.muiName = 'Component';

      assert.strictEqual(isMuiElement(<Component />, ['Component']), true);
      assert.strictEqual(isMuiElement(<div />, ['Input']), false);
      assert.strictEqual(isMuiElement(null, ['SvgIcon']), false);
      assert.strictEqual(isMuiElement('TextNode', ['SvgIcon']), false);
    });

    it('should be truthy for matching components', () => {
      [
        [Input, 'Input'],
        [ListItemAvatar, 'ListItemAvatar'],
        [ListItemSecondaryAction, 'ListItemSecondaryAction'],
        [SvgIcon, 'SvgIcon'],
      ].forEach(([Component, muiName]) => {
        assert.strictEqual(isMuiElement(<Component />, [muiName]), true);
      });
    });
  });

  describe('setRef', () => {
    it('can handle callback refs', () => {
      const ref = spy();
      const instance = 'proxy';

      setRef(ref, instance);

      assert.strictEqual(ref.called, true);
      assert.strictEqual(ref.firstCall.args[0], instance);
    });

    it('can handle ref objects', () => {
      const ref = React.createRef();
      const instance = 'proxy';

      setRef(ref, instance);

      assert.strictEqual(ref.current, instance);
    });

    it('ignores falsy refs without errors', () => {
      const instance = 'proxy';

      // all no-ops
      setRef(undefined, instance);
      setRef(null, instance);
    });

    it('throws on legacy string refs', () => {
      assert.throws(() => setRef('stringRef1', 'proxy'));
    });
  });
});
