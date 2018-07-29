import * as React from 'react';
import { StandardProps } from '..';

interface CommonProps<T>
  extends StandardProps<
      React.HTMLAttributes<HTMLDivElement>,
      ToggleButtonGroupClassKey,
      'onChange'
    > {
  selected?: boolean;
}

interface PropsExclusive<T> extends CommonProps<T> {
  exclusive: true;
  /**
   * Triggered when a child triggers an onChange event.
   * The value argument is null if the value did not change
   */
  onChange?: (value: T | null) => void;
  /**
   * the selected value
   */
  value?: T;
}

interface PropsNonExclusive<T extends Array<any>> extends CommonProps<T> {
  exclusive?: false;
  /**
   * Triggered when a child triggers an onChange event.
   * The value argument contains all values that are still selected or is null
   * if no values are selected.
   */
  onChange?: (value: T | null) => void;
  /**
   * the selected values
   */
  value?: T;
}

export type ToggleButtonGroupProps<T> = PropsExclusive<T> | PropsNonExclusive<T[]>;

export type ToggleButtonGroupClassKey = 'root' | 'selected';

export default class ToggleButtonGroup<T> extends React.Component<ToggleButtonGroupProps<T>> {}
