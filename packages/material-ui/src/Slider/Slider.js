import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { chainPropTypes } from '@material-ui/utils';
import withStyles from '../styles/withStyles';
import useTheme from '../styles/useTheme';
import { fade } from '../styles/colorManipulator';
import { useIsFocusVisible } from '../utils/focusVisible';
import useEventCallback from '../utils/useEventCallback';
import useForkRef from '../utils/useForkRef';
import capitalize from '../utils/capitalize';
import ValueLabel from './ValueLabel';

function asc(a, b) {
  return a - b;
}

function clamp(value, min, max) {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
}

function findClosest(values, currentValue) {
  const { index: closestIndex } = values.reduce((acc, value, index) => {
    const distance = Math.abs(currentValue - value);

    if (acc === null || distance < acc.distance || distance === acc.distance) {
      return {
        distance,
        index,
      };
    }

    return acc;
  }, null);
  return closestIndex;
}

function valueToPercent(value, min, max) {
  return ((value - min) * 100) / (max - min);
}

function percentToValue(percent, min, max) {
  return (max - min) * percent + min;
}

function getDecimalPrecision(num) {
  // This handles the case when num is very small (0.00000001), js will turn this into 1e-8.
  // When num is bigger than 1 or less than -1 it won't get converted to this notation so it's fine.
  if (Math.abs(num) < 1) {
    const parts = num.toExponential().split('e-');
    const matissaDecimalPart = parts[0].split('.')[1];
    return (matissaDecimalPart ? matissaDecimalPart.length : 0) + parseInt(parts[1], 10);
  }

  const decimalPart = num.toString().split('.')[1];
  return decimalPart ? decimalPart.length : 0;
}

function roundValueToStep(value, step) {
  const nearest = Math.round(value / step) * step;
  return Number(nearest.toFixed(getDecimalPrecision(step)));
}

const axisProps = {
  horizontal: {
    offset: percent => ({ left: `${percent}%` }),
    leap: percent => ({ width: `${percent}%` }),
  },
  'horizontal-reverse': {
    offset: percent => ({ right: `${percent}%` }),
    leap: percent => ({ width: `${percent}%` }),
  },
  vertical: {
    offset: percent => ({ bottom: `${percent}%` }),
    leap: percent => ({ height: `${percent}%` }),
  },
};

const defaultMarks = [];
const Identity = x => x;

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    height: 2,
    width: '100%',
    boxSizing: 'content-box',
    padding: '11px 0',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    touchAction: 'none',
    color: theme.palette.primary.main,
    // Remove grey highlight
    WebkitTapHighlightColor: 'transparent',
    '&$disabled': {
      cursor: 'default',
      color: theme.palette.grey[400],
    },
    '&$vertical': {
      width: 2,
      height: '100%',
      padding: '0 11px',
    },
  },
  /* Styles applied to the root element if `color="primary"`. */
  colorPrimary: {
    // TODO v5, move the style here
  },
  /* Styles applied to the root element if `color="secondary"`. */
  colorSecondary: {
    color: theme.palette.secondary.main,
  },
  /* Styles applied to the root element if `marks` is provided with at least one label. */
  marked: {
    marginBottom: 20,
    '&$vertical': {
      marginBottom: 'auto',
      marginRight: 20,
    },
  },
  /* Pseudo-class applied to the root element if `orientation="vertical"`. */
  vertical: {},
  /* Pseudo-class applied to the root element if `disabled={true}`. */
  disabled: {},
  /* Styles applied to the rail element. */
  rail: {
    display: 'block',
    position: 'absolute',
    width: '100%',
    height: 2,
    borderRadius: 1,
    backgroundColor: 'currentColor',
    opacity: 0.38,
    '$vertical &': {
      height: '100%',
      width: 2,
    },
  },
  /* Styles applied to the track element. */
  track: {
    display: 'block',
    position: 'absolute',
    height: 2,
    borderRadius: 1,
    backgroundColor: 'currentColor',
    '$vertical &': {
      width: 2,
    },
  },
  /* Styles applied to the thumb element. */
  thumb: {
    position: 'absolute',
    width: 12,
    height: 12,
    marginLeft: -6,
    marginTop: -5,
    boxSizing: 'border-box',
    borderRadius: '50%',
    outline: 0,
    backgroundColor: 'currentColor',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: theme.transitions.create(['box-shadow'], {
      duration: theme.transitions.duration.shortest,
    }),
    '&$focusVisible,&:hover': {
      boxShadow: `0px 0px 0px 8px ${fade(theme.palette.primary.main, 0.16)}`,
      '@media (hover: none)': {
        boxShadow: 'none',
      },
    },
    '&$active': {
      boxShadow: `0px 0px 0px 14px ${fade(theme.palette.primary.main, 0.16)}`,
    },
    '$disabled &': {
      pointerEvents: 'none',
      width: 8,
      height: 8,
      marginLeft: -4,
      marginTop: -3,
      '&:hover': {
        boxShadow: 'none',
      },
    },
    '$vertical &': {
      marginLeft: -5,
      marginBottom: -6,
    },
    '$vertical$disabled &': {
      marginLeft: -3,
      marginBottom: -4,
    },
  },
  /* Styles applied to the thumb element if `color="primary"`. */
  thumbColorPrimary: {
    // TODO v5, move the style here
  },
  /* Styles applied to the thumb element if `color="secondary"`. */
  thumbColorSecondary: {
    '&$focusVisible,&:hover': {
      boxShadow: `0px 0px 0px 8px ${fade(theme.palette.secondary.main, 0.16)}`,
    },
    '&$active': {
      boxShadow: `0px 0px 0px 14px ${fade(theme.palette.secondary.main, 0.16)}`,
    },
  },
  /* Pseudo-class applied to the thumb element if it's active. */
  active: {},
  /* Pseudo-class applied to the thumb element if keyboard focused. */
  focusVisible: {},
  /* Styles applied to the thumb label element. */
  valueLabel: {},
  /* Styles applied to the mark element. */
  mark: {
    position: 'absolute',
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: 'currentColor',
  },
  /* Styles applied to the mark element if active (depending on the value). */
  markActive: {
    backgroundColor: theme.palette.background.paper,
    opacity: 0.8,
  },
  /* Styles applied to the mark label element. */
  markLabel: {
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    position: 'absolute',
    top: 22,
    transform: 'translateX(-50%)',
    whiteSpace: 'nowrap',
    '$vertical &': {
      top: 'auto',
      left: 22,
      transform: 'translateY(50%)',
    },
  },
  /* Styles applied to the mark label element if active (depending on the value). */
  markLabelActive: {
    color: theme.palette.text.primary,
  },
});

function Thumb(props) {
  const {
    ariaLabel,
    ariaLabelledby,
    ariaValuetext,
    axis,
    classes,
    color,
    disabled,
    getAriaLabel,
    getValueFor,
    getAriaValueText,
    index,
    marks,
    min,
    max,
    onInput,
    onChange,
    orientation,
    step,
    value,
    valueLabelDisplay,
    valueLabelFormat,
  } = props;

  const percent = valueToPercent(value, min, max);
  const style = axisProps[axis].offset(percent);

  const [focusVisible, setFocusVisible] = React.useState(false);
  const { isFocusVisible, onBlurVisible, ref: focusVisibleRef } = useIsFocusVisible();
  function handleFocus(event) {
    if (isFocusVisible(event)) {
      setFocusVisible(true);
    }
  }

  const [active, setActive] = React.useState(false);
  function handleGotPointerCapture() {
    setActive(true);
  }
  function handleLostPointerCapture() {
    setActive(false);
  }

  /**
   *
   * @param {PointerEvent} event
   */
  function handlePointerMove(event) {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      const newValue = getValueFor(event);
      onInput(newValue, index);
    }
  }

  const handleKeyDown = useEventCallback(event => {
    const tenPercents = (max - min) / 10;
    const marksValues = marks.map(mark => mark.value);
    const marksIndex = marksValues.indexOf(value);
    let newValue;

    switch (event.key) {
      case 'Home':
        newValue = min;
        break;
      case 'End':
        newValue = max;
        break;
      case 'PageUp':
        if (step) {
          newValue = value + tenPercents;
        }
        break;
      case 'PageDown':
        if (step) {
          newValue = value - tenPercents;
        }
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        if (step) {
          newValue = value + step;
        } else {
          newValue = marksValues[marksIndex + 1] || marksValues[marksValues.length - 1];
        }
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        if (step) {
          newValue = value - step;
        } else {
          newValue = marksValues[marksIndex - 1] || marksValues[0];
        }
        break;
      default:
        return;
    }

    event.preventDefault();

    if (step) {
      newValue = roundValueToStep(newValue, step);
    }

    newValue = clamp(newValue, min, max);

    onInput(newValue);
    onChange(newValue);
  });

  return (
    <ValueLabel
      key={index}
      valueLabelFormat={valueLabelFormat}
      valueLabelDisplay={valueLabelDisplay}
      className={classes.valueLabel}
      value={value}
      index={index}
      open={active}
      disabled={disabled}
    >
      <span
        className={clsx(classes.thumb, classes[`thumbColor${capitalize(color)}`], {
          [classes.active]: active,
          [classes.focusVisible]: focusVisible,
        })}
        tabIndex={disabled ? null : 0}
        role="slider"
        style={style}
        data-index={index}
        aria-label={getAriaLabel ? getAriaLabel(index) : ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-orientation={orientation}
        aria-valuemax={max}
        aria-valuemin={min}
        aria-valuenow={value}
        aria-valuetext={getAriaValueText ? getAriaValueText(value, index) : ariaValuetext}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={onBlurVisible}
        onPointerMove={handlePointerMove}
        onGotPointerCapture={handleGotPointerCapture}
        onLostPointerCapture={handleLostPointerCapture}
        ref={focusVisibleRef}
      />
    </ValueLabel>
  );
}

Thumb.propTypes = {
  classes: PropTypes.object.isRequired,
};

const Slider = React.forwardRef(function Slider(props, ref) {
  const {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'aria-valuetext': ariaValuetext,
    classes,
    className,
    color = 'primary',
    component: Component = 'span',
    defaultValue,
    disabled = false,
    getAriaLabel,
    getAriaValueText,
    marks: marksProp = defaultMarks,
    max = 100,
    min = 0,
    name,
    onChange,
    onChangeCommitted,
    onMouseDown,
    orientation = 'horizontal',
    step = 1,
    ThumbComponent = 'span',
    value: valueProp,
    ValueLabelComponent = ValueLabel,
    valueLabelDisplay = 'off',
    valueLabelFormat = Identity,
    ...other
  } = props;
  const theme = useTheme();
  const { current: isControlled } = React.useRef(valueProp != null);
  const [valueState, setValueState] = React.useState(defaultValue);
  const valueDerived = isControlled ? valueProp : valueState;
  const range = Array.isArray(valueDerived);
  let values = range ? [...valueDerived].sort(asc) : [valueDerived];
  values = values.map(value => clamp(value, min, max));
  const marks =
    marksProp === true && step !== null
      ? [...Array(Math.floor((max - min) / step) + 1)].map((_, index) => ({
          value: min + step * index,
        }))
      : marksProp;

  const sliderRef = React.useRef();
  const handleRef = useForkRef(ref, sliderRef);

  let axis = orientation;
  if (theme.direction === 'rtl' && orientation === 'horizontal') {
    axis += '-reverse';
  }

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      if (isControlled !== (valueProp != null)) {
        console.error(
          [
            `Material-UI: A component is changing ${
              isControlled ? 'a ' : 'an un'
            }controlled Slider to be ${isControlled ? 'un' : ''}controlled.`,
            'Elements should not switch from uncontrolled to controlled (or vice versa).',
            'Decide between using a controlled or uncontrolled Slider ' +
              'element for the lifetime of the component.',
            'More info: https://fb.me/react-controlled-components',
          ].join('\n'),
        );
      }
    }, [valueProp, isControlled]);
  }

  /**
   * @param {MouseEvent} event
   */
  function getValueFor(event) {
    const { current: slider } = sliderRef;
    const { width, height, bottom, left } = slider.getBoundingClientRect();
    let percent;

    if (axis.indexOf('vertical') === 0) {
      percent = (bottom - event.clientY) / height;
    } else {
      percent = (event.clientX - left) / width;
    }

    if (axis.indexOf('-reverse') !== -1) {
      percent = 1 - percent;
    }

    let value = percentToValue(percent, min, max);
    if (step) {
      value = roundValueToStep(value, step);
    } else {
      const marksValues = marks.map(mark => mark.value);
      const closestIndex = findClosest(marksValues, value);
      value = marksValues[closestIndex];
    }

    return value;
  }

  function handlePointerDown(event) {
    if (disabled) {
      return;
    }

    event.preventDefault();

    const newValue = getValueFor(event);
    const closestIndex = findClosest(values, newValue);
    // TODO: use array of refs (or Scope)
    const slider = sliderRef.current.querySelector(`[data-index="${closestIndex}"]`);
    slider.setPointerCapture(event.pointerId);
    slider.focus();

    if (!isControlled) {
      setValueState(newValue);
    }
    if (onChange) {
      onChange(event, newValue);
    }
  }

  function handleChange(newValue, index) {
    // [...values, ...{ [index]: newValue }]
    const newValues = [...values];
    newValues[index] = newValue;
    setValueState(newValues);

    if (onChange) {
      onChange(null, newValues);
    }
  }

  const trackOffset = valueToPercent(range ? values[0] : min, min, max);
  const trackLeap = valueToPercent(values[values.length - 1], min, max) - trackOffset;
  const trackStyle = {
    ...axisProps[axis].offset(trackOffset),
    ...axisProps[axis].leap(trackLeap),
  };

  return (
    <Component
      ref={handleRef}
      className={clsx(
        classes.root,
        classes[`color${capitalize(color)}`],
        {
          [classes.disabled]: disabled,
          [classes.marked]: marks.length > 0 && marks.some(mark => mark.label),
          [classes.vertical]: orientation === 'vertical',
        },
        className,
      )}
      onPointerDown={handlePointerDown}
      {...other}
    >
      <span className={classes.rail} />
      <span className={classes.track} style={trackStyle} />
      <input value={values.join(',')} name={name} type="hidden" />
      {marks.map(mark => {
        const percent = valueToPercent(mark.value, min, max);
        const style = axisProps[axis].offset(percent);
        const markActive = range
          ? mark.value >= values[0] && mark.value <= values[values.length - 1]
          : mark.value <= values[0];

        return (
          <React.Fragment key={mark.value}>
            <span
              style={style}
              className={clsx(classes.mark, {
                [classes.markActive]: markActive,
              })}
            />
            <span
              aria-hidden
              style={style}
              className={clsx(classes.markLabel, {
                [classes.markLabelActive]: markActive,
              })}
            >
              {mark.label}
            </span>
          </React.Fragment>
        );
      })}
      {values.map((value, index) => {
        return (
          <Thumb
            key={index}
            ariaLabel={ariaLabel}
            ariaLabelledby={ariaLabelledby}
            ariaValuetext={ariaValuetext}
            axis={axis}
            classes={classes}
            color={color}
            disabled={disabled}
            index={index}
            getAriaLabel={getAriaLabel}
            getAriaValueText={getAriaValueText}
            getValueFor={getValueFor}
            marks={marks}
            min={min}
            max={max}
            onInput={handleChange}
            orientation={orientation}
            step={step}
            value={value}
            valueLabelFormat={valueLabelFormat}
            valueLabelDisplay={valueLabelDisplay}
          />
        );
      })}
    </Component>
  );
});

Slider.propTypes = {
  /**
   * The label of the slider.
   */
  'aria-label': chainPropTypes(PropTypes.string, props => {
    const range = Array.isArray(props.value || props.defaultValue);

    if (range && props['aria-label'] != null) {
      return new Error(
        'Material-UI: you need to use the `getAriaLabel` prop instead of `aria-label` when using a range slider.',
      );
    }

    return null;
  }),
  /**
   * The id of the element containing a label for the slider.
   */
  'aria-labelledby': PropTypes.string,
  /**
   * A string value that provides a user-friendly name for the current value of the slider.
   */
  'aria-valuetext': chainPropTypes(PropTypes.string, props => {
    const range = Array.isArray(props.value || props.defaultValue);

    if (range && props['aria-valuetext'] != null) {
      return new Error(
        'Material-UI: you need to use the `getAriaValueText` prop instead of `aria-valuetext` when using a range slider.',
      );
    }

    return null;
  }),
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: PropTypes.oneOf(['primary', 'secondary']),
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The default element value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
  /**
   * If `true`, the slider will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the thumb labels of the slider.
   *
   * @param {number} index The thumb label's index to format.
   * @returns {string}
   */
  getAriaLabel: PropTypes.func,
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current value of the slider.
   *
   * @param {number} value The thumb label's value to format.
   * @param {number} index The thumb label's index to format.
   * @returns {string}
   */
  getAriaValueText: PropTypes.func,
  /**
   * Marks indicate predetermined values to which the user can move the slider.
   * If `true` the marks will be spaced according the value of the `step` prop.
   * If an array, it should contain objects with `value` and an optional `label` keys.
   */
  marks: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  /**
   * The maximum allowed value of the slider.
   * Should not be equal to min.
   */
  max: PropTypes.number,
  /**
   * The minimum allowed value of the slider.
   * Should not be equal to max.
   */
  min: PropTypes.number,
  /**
   * Name attribute of the hidden `input` element.
   */
  name: PropTypes.string,
  /**
   * Callback function that is fired when the slider's value changed.
   *
   * @param {object} event The event source of the callback.
   * @param {any} value The new value.
   */
  onChange: PropTypes.func,
  /**
   * Callback function that is fired when the `mouseup` is triggered.
   *
   * @param {object} event The event source of the callback.
   * @param {any} value The new value.
   */
  onChangeCommitted: PropTypes.func,
  /**
   * @ignore
   */
  onMouseDown: PropTypes.func,
  /**
   * The slider orientation.
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * The granularity with which the slider can step through values. (A "discrete" slider.)
   * When step is `null`, the thumb can only be slid onto marks provided with the `marks` prop.
   */
  step: PropTypes.number,
  /**
   * The component used to display the value label.toggl
   */
  ThumbComponent: PropTypes.elementType,
  /**
   * The value of the slider.
   * For ranged sliders, provide an array with two values.
   */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
  /**
   * The value label component.
   */
  ValueLabelComponent: PropTypes.elementType,
  /**
   * Controls when the value label is displayed:
   *
   * - `auto` the value label will display when the thumb is hovered or focused.
   * - `on` will display persistently.
   * - `off` will never display.
   */
  valueLabelDisplay: PropTypes.oneOf(['on', 'auto', 'off']),
  /**
   * The format function the value label's value.
   *
   * When a function is provided, it should have the following signature:
   *
   * - {number} value The value label's value to format
   * - {number} index The value label's index to format
   */
  valueLabelFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

export default withStyles(styles, { name: 'MuiSlider' })(Slider);
