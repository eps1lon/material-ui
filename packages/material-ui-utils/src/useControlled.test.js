import * as React from 'react';
import { expect } from 'chai';
import { act, createClientRender } from 'test/utils';
import useControlled from './useControlled';

const TestComponent = ({ value: valueProp, defaultValue, children }) => {
  const [value, setValue] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: 'TestComponent',
  });
  return children({ value, setValue });
};

describe('useControlled', () => {
  const render = createClientRender();

  it('works correctly when is not controlled', () => {
    let valueState;
    let setValueState;
    render(
      <TestComponent defaultValue={1}>
        {({ value, setValue }) => {
          valueState = value;
          setValueState = setValue;
          return null;
        }}
      </TestComponent>,
    );
    expect(valueState).to.equal(1);

    act(() => {
      setValueState(2);
    });

    expect(valueState).to.equal(2);
  });

  it('works correctly when is controlled', () => {
    let valueState;
    render(
      <TestComponent value={1}>
        {({ value }) => {
          valueState = value;
          return null;
        }}
      </TestComponent>,
    );
    expect(valueState).to.equal(1);
  });

  it('warns when switching from uncontrolled to controlled', () => {
    let setProps;
    expect(() => {
      ({ setProps } = render(<TestComponent>{() => null}</TestComponent>));
    }).not.toErrorDev();

    expect(() => {
      setProps({ value: 'foobar' });
    }).toErrorDev(
      'Material-UI: A component is changing the uncontrolled value state of TestComponent to be controlled.',
    );
  });

  it('warns when switching from controlled to uncontrolled', () => {
    let setProps;

    expect(() => {
      ({ setProps } = render(<TestComponent value="foobar">{() => null}</TestComponent>));
    }).not.toErrorDev();

    expect(() => {
      setProps({ value: undefined });
    }).toErrorDev(
      'Material-UI: A component is changing the controlled value state of TestComponent to be uncontrolled.',
    );
  });

  it('does not warn when changing the defaultValue prop after initial rendering', () => {
    let setProps;

    function MinimalDateInput(props) {
      const { defaultDate } = props;
      useControlled({ controlled: undefined, default: defaultDate, name: 'defaultDate' });

      return <input type="date" defaultValue={defaultDate} readOnly />;
    }

    expect(() => {
      ({ setProps } = render(<MinimalDateInput defaultDate={new Date()} />));
    }).not.toErrorDev();

    expect(() => {
      setProps({ defaultDate: new Date() });
    }).not.toErrorDev();
  });

  it('should not raise a warning if changing the defaultValue when controlled', () => {
    let setProps;

    expect(() => {
      ({ setProps } = render(
        <TestComponent value={1} defaultValue={0}>
          {() => null}
        </TestComponent>,
      ));
    }).not.toErrorDev();

    expect(() => {
      setProps({ defaultValue: 1 });
    }).not.toErrorDev();
  });
});
