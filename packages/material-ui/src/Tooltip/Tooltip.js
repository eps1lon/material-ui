import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { deepmerge, elementAcceptingRef } from '@material-ui/utils';
import { fade } from '../styles/colorManipulator';
import withStyles from '../styles/withStyles';
import capitalize from '../utils/capitalize';
import Grow from '../Grow';
import Popper from '../Popper';
import useEventCallback from '../utils/useEventCallback';
import useForkRef from '../utils/useForkRef';
import useId from '../utils/useId';
import useIsFocusVisible from '../utils/useIsFocusVisible';
import useControlled from '../utils/useControlled';
import useTheme from '../styles/useTheme';

function round(value) {
  return Math.round(value * 1e5) / 1e5;
}

function arrowGenerator() {
  return {
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: '-0.71em',
      marginLeft: 4,
      marginRight: 4,
      '&::before': {
        transformOrigin: '0 100%',
      },
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: '-0.71em',
      marginLeft: 4,
      marginRight: 4,
      '&::before': {
        transformOrigin: '100% 0',
      },
    },
    '&[x-placement*="right"] $arrow': {
      left: 0,
      marginLeft: '-0.71em',
      height: '1em',
      width: '0.71em',
      marginTop: 4,
      marginBottom: 4,
      '&::before': {
        transformOrigin: '100% 100%',
      },
    },
    '&[x-placement*="left"] $arrow': {
      right: 0,
      marginRight: '-0.71em',
      height: '1em',
      width: '0.71em',
      marginTop: 4,
      marginBottom: 4,
      '&::before': {
        transformOrigin: '0 0',
      },
    },
  };
}

export const styles = (theme) => ({
  /* Styles applied to the Popper component. */
  popper: {
    zIndex: theme.zIndex.tooltip,
    pointerEvents: 'none', // disable jss-rtl plugin
  },
  /* Styles applied to the Popper component if `interactive={true}`. */
  popperInteractive: {
    pointerEvents: 'auto',
  },
  /* Styles applied to the Popper component if `arrow={true}`. */
  popperArrow: arrowGenerator(),
  /* Styles applied to the tooltip (label wrapper) element. */
  tooltip: {
    backgroundColor: fade(theme.palette.grey[700], 0.92),
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.common.white,
    fontFamily: theme.typography.fontFamily,
    padding: '4px 8px',
    fontSize: theme.typography.pxToRem(11),
    maxWidth: 300,
    wordWrap: 'break-word',
    fontWeight: theme.typography.fontWeightMedium,
  },
  /* Styles applied to the tooltip (label wrapper) element if `arrow={true}`. */
  tooltipArrow: {
    position: 'relative',
    margin: '0',
  },
  /* Styles applied to the arrow element. */
  arrow: {
    overflow: 'hidden',
    position: 'absolute',
    width: '1em',
    height: '0.71em' /* = width / sqrt(2) = (length of the hypotenuse) */,
    boxSizing: 'border-box',
    color: fade(theme.palette.grey[700], 0.9),
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: '100%',
      height: '100%',
      backgroundColor: 'currentColor',
      transform: 'rotate(45deg)',
    },
  },
  /* Styles applied to the tooltip (label wrapper) element if the tooltip is opened by touch. */
  touch: {
    padding: '8px 16px',
    fontSize: theme.typography.pxToRem(14),
    lineHeight: `${round(16 / 14)}em`,
    fontWeight: theme.typography.fontWeightRegular,
  },
  /* Styles applied to the tooltip (label wrapper) element if `placement` contains "left". */
  tooltipPlacementLeft: {
    transformOrigin: 'right center',
    margin: '0 24px ',
    [theme.breakpoints.up('sm')]: {
      margin: '0 14px',
    },
  },
  /* Styles applied to the tooltip (label wrapper) element if `placement` contains "right". */
  tooltipPlacementRight: {
    transformOrigin: 'left center',
    margin: '0 24px',
    [theme.breakpoints.up('sm')]: {
      margin: '0 14px',
    },
  },
  /* Styles applied to the tooltip (label wrapper) element if `placement` contains "top". */
  tooltipPlacementTop: {
    transformOrigin: 'center bottom',
    margin: '24px 0',
    [theme.breakpoints.up('sm')]: {
      margin: '14px 0',
    },
  },
  /* Styles applied to the tooltip (label wrapper) element if `placement` contains "bottom". */
  tooltipPlacementBottom: {
    transformOrigin: 'center top',
    margin: '24px 0',
    [theme.breakpoints.up('sm')]: {
      margin: '14px 0',
    },
  },
});

let hystersisOpen = false;
let hystersisTimer = null;

export function testReset() {
  hystersisOpen = false;
  clearTimeout(hystersisTimer);
}

const Tooltip = React.forwardRef(function Tooltip(props, ref) {
  const {
    arrow = false,
    children,
    classes,
    describeChild = false,
    disableFocusListener = false,
    disableHoverListener = false,
    disableTouchListener = false,
    enterDelay = 100,
    enterNextDelay = 0,
    enterTouchDelay = 700,
    id: idProp,
    interactive = false,
    leaveDelay = 0,
    leaveTouchDelay = 1500,
    onClose,
    onOpen,
    open: openProp,
    placement = 'bottom',
    PopperComponent = Popper,
    PopperProps,
    title,
    TransitionComponent = Grow,
    TransitionProps,
    ...other
  } = props;
  const theme = useTheme();

  const [childNode, setChildNode] = React.useState();
  const [arrowRef, setArrowRef] = React.useState(null);
  const ignoreNonTouchEvents = React.useRef(false);

  const closeTimer = React.useRef();
  const enterTimer = React.useRef();
  const leaveTimer = React.useRef();
  const touchTimer = React.useRef();

  const [openState, setOpenState] = useControlled({
    controlled: openProp,
    default: false,
    name: 'Tooltip',
    state: 'open',
  });

  let open = openState;

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { current: isControlled } = React.useRef(openProp !== undefined);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      if (
        childNode &&
        childNode.disabled &&
        !isControlled &&
        title !== '' &&
        childNode.tagName.toLowerCase() === 'button'
      ) {
        console.error(
          [
            'Material-UI: You are providing a disabled `button` child to the Tooltip component.',
            'A disabled element does not fire events.',
            "Tooltip needs to listen to the child element's events to display the title.",
            '',
            'Add a simple wrapper element, such as a `span`.',
          ].join('\n'),
        );
      }
    }, [title, childNode, isControlled]);
  }

  const id = useId(idProp);

  React.useEffect(() => {
    return () => {
      clearTimeout(closeTimer.current);
      clearTimeout(enterTimer.current);
      clearTimeout(leaveTimer.current);
      clearTimeout(touchTimer.current);
    };
  }, []);

  const handleOpen = (event) => {
    clearTimeout(hystersisTimer);
    hystersisOpen = true;

    // The mouseover event will trigger for every nested element in the tooltip.
    // We can skip rerendering when the tooltip is already open.
    // We are using the mouseover event instead of the mouseenter event to fix a hide/show issue.
    setOpenState(true);

    if (onOpen) {
      onOpen(event);
    }
  };

  const handleEnter = (forward = true) => (event) => {
    const childrenProps = children.props;

    if (event.type === 'mouseover' && childrenProps.onMouseOver && forward) {
      childrenProps.onMouseOver(event);
    }

    if (ignoreNonTouchEvents.current && event.type !== 'touchstart') {
      return;
    }

    // Remove the title ahead of time.
    // We don't want to wait for the next render commit.
    // We would risk displaying two tooltips at the same time (native + this one).
    if (childNode) {
      childNode.removeAttribute('title');
    }

    clearTimeout(enterTimer.current);
    clearTimeout(leaveTimer.current);
    if (enterDelay || (hystersisOpen && enterNextDelay)) {
      event.persist();
      enterTimer.current = setTimeout(
        () => {
          handleOpen(event);
        },
        hystersisOpen ? enterNextDelay : enterDelay,
      );
    } else {
      handleOpen(event);
    }
  };

  const {
    isFocusVisibleRef,
    onBlur: handleBlurVisible,
    onFocus: handleFocusVisible,
    ref: focusVisibleRef,
  } = useIsFocusVisible();
  // We don't necessarily care about the focusVisible state (which is safe to access via ref anyway).
  // We just need to re-render the Tooltip if the focus-visible state changes.
  const [, setChildIsFocusVisible] = React.useState(false);
  const handleBlur = (event) => {
    handleBlurVisible(event);
    if (isFocusVisibleRef.current === false) {
      setChildIsFocusVisible(false);
    }
  };

  const handleFocus = (forward = true) => (event) => {
    // Workaround for https://github.com/facebook/react/issues/7769
    // The autoFocus of React might trigger the event before the componentDidMount.
    // We need to account for this eventuality.
    if (!childNode) {
      setChildNode(event.currentTarget);
    }

    handleFocusVisible(event);
    if (isFocusVisibleRef.current === true) {
      setChildIsFocusVisible(true);
      handleEnter()(event);
    }

    const childrenProps = children.props;
    if (childrenProps.onFocus && forward) {
      childrenProps.onFocus(event);
    }
  };

  const handleClose = useEventCallback(
    /**
     * @param {React.SyntheticEvent | Event} event
     */
    (event) => {
      clearTimeout(hystersisTimer);
      hystersisTimer = setTimeout(() => {
        hystersisOpen = false;
      }, 800 + leaveDelay);
      setOpenState(false);

      if (onClose) {
        onClose(event);
      }

      clearTimeout(closeTimer.current);
      closeTimer.current = setTimeout(() => {
        ignoreNonTouchEvents.current = false;
      }, theme.transitions.duration.shortest);
    },
  );

  const handleLeave = (forward = true) => (event) => {
    const childrenProps = children.props;

    if (event.type === 'blur') {
      if (childrenProps.onBlur && forward) {
        childrenProps.onBlur(event);
      }
      handleBlur(event);
    }

    if (
      event.type === 'mouseleave' &&
      childrenProps.onMouseLeave &&
      event.currentTarget === childNode
    ) {
      childrenProps.onMouseLeave(event);
    }

    clearTimeout(enterTimer.current);
    clearTimeout(leaveTimer.current);
    event.persist();
    leaveTimer.current = setTimeout(() => {
      handleClose(event);
    }, leaveDelay);
  };

  const detectTouchStart = (event) => {
    ignoreNonTouchEvents.current = true;

    const childrenProps = children.props;
    if (childrenProps.onTouchStart) {
      childrenProps.onTouchStart(event);
    }
  };

  const handleTouchStart = (event) => {
    detectTouchStart(event);
    clearTimeout(leaveTimer.current);
    clearTimeout(closeTimer.current);
    clearTimeout(touchTimer.current);
    event.persist();
    touchTimer.current = setTimeout(() => {
      handleEnter()(event);
    }, enterTouchDelay);
  };

  const handleTouchEnd = (event) => {
    if (children.props.onTouchEnd) {
      children.props.onTouchEnd(event);
    }

    clearTimeout(touchTimer.current);
    clearTimeout(leaveTimer.current);
    event.persist();
    leaveTimer.current = setTimeout(() => {
      handleClose(event);
    }, leaveTouchDelay);
  };

  React.useEffect(() => {
    if (!open) {
      return undefined;
    }

    /**
     * @param {KeyboardEvent} nativeEvent
     */
    function handleKeyDown(nativeEvent) {
      // IE 11, Edge (prior to using Bink?) use 'Esc'
      if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
        handleClose(nativeEvent);
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClose, open]);

  const handleUseRef = useForkRef(setChildNode, ref);
  const handleFocusRef = useForkRef(focusVisibleRef, handleUseRef);
  const handleRef = useForkRef(children.ref, handleFocusRef);

  // There is no point in displaying an empty tooltip.
  if (title === '') {
    open = false;
  }

  const nameOrDescProps = {};
  const titleIsString = typeof title === 'string';
  if (describeChild) {
    nameOrDescProps['title'] = !open && titleIsString && !disableHoverListener ? title : null;
    nameOrDescProps['aria-describedby'] = open ? id : null;
  } else {
    nameOrDescProps['aria-label'] = titleIsString ? title : null;
    nameOrDescProps['aria-labelledby'] = open && !titleIsString ? id : null;
  }

  const childrenProps = {
    ...nameOrDescProps,
    ...other,
    ...children.props,
    className: clsx(other.className, children.props.className),
    onTouchStart: detectTouchStart,
    ref: handleRef,
  };

  const interactiveWrapperListeners = {};

  if (!disableTouchListener) {
    childrenProps.onTouchStart = handleTouchStart;
    childrenProps.onTouchEnd = handleTouchEnd;
  }

  if (!disableHoverListener) {
    childrenProps.onMouseOver = handleEnter();
    childrenProps.onMouseLeave = handleLeave();

    if (interactive) {
      interactiveWrapperListeners.onMouseOver = handleEnter(false);
      interactiveWrapperListeners.onMouseLeave = handleLeave(false);
    }
  }

  if (!disableFocusListener) {
    childrenProps.onFocus = handleFocus();
    childrenProps.onBlur = handleLeave();

    if (interactive) {
      interactiveWrapperListeners.onFocus = handleFocus(false);
      interactiveWrapperListeners.onBlur = handleLeave(false);
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    if (children.props.title) {
      console.error(
        [
          'Material-UI: You have provided a `title` prop to the child of <Tooltip />.',
          `Remove this title prop \`${children.props.title}\` or the Tooltip component.`,
        ].join('\n'),
      );
    }
  }

  const mergedPopperProps = React.useMemo(() => {
    return deepmerge(
      {
        popperOptions: {
          modifiers: {
            arrow: {
              enabled: Boolean(arrowRef),
              element: arrowRef,
            },
          },
        },
      },
      PopperProps,
    );
  }, [arrowRef, PopperProps]);

  return (
    <React.Fragment>
      {React.cloneElement(children, childrenProps)}
      <PopperComponent
        className={clsx(classes.popper, {
          [classes.popperInteractive]: interactive,
          [classes.popperArrow]: arrow,
        })}
        placement={placement}
        anchorEl={childNode}
        open={childNode ? open : false}
        id={id}
        transition
        {...interactiveWrapperListeners}
        {...mergedPopperProps}
      >
        {({ placement: placementInner, TransitionProps: TransitionPropsInner }) => (
          <TransitionComponent
            timeout={theme.transitions.duration.shorter}
            {...TransitionPropsInner}
            {...TransitionProps}
          >
            <div
              className={clsx(
                classes.tooltip,
                {
                  [classes.touch]: ignoreNonTouchEvents.current,
                  [classes.tooltipArrow]: arrow,
                },
                classes[`tooltipPlacement${capitalize(placementInner.split('-')[0])}`],
              )}
            >
              {title}
              {arrow ? <span className={classes.arrow} ref={setArrowRef} /> : null}
            </div>
          </TransitionComponent>
        )}
      </PopperComponent>
    </React.Fragment>
  );
});

Tooltip.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * If `true`, adds an arrow to the tooltip.
   * @default false
   */
  arrow: PropTypes.bool,
  /**
   * Tooltip reference element.
   */
  children: elementAcceptingRef.isRequired,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Set to `true` if the `title` acts as an accessible description.
   * By default the `title` acts as an accessible label for the child.
   */
  describeChild: PropTypes.bool,
  /**
   * Do not respond to focus events.
   * @default false
   */
  disableFocusListener: PropTypes.bool,
  /**
   * Do not respond to hover events.
   * @default false
   */
  disableHoverListener: PropTypes.bool,
  /**
   * Do not respond to long press touch events.
   * @default false
   */
  disableTouchListener: PropTypes.bool,
  /**
   * The number of milliseconds to wait before showing the tooltip.
   * This prop won't impact the enter touch delay (`enterTouchDelay`).
   * @default 100
   */
  enterDelay: PropTypes.number,
  /**
   * The number of milliseconds to wait before showing the tooltip when one was already recently opened.
   * @default 0
   */
  enterNextDelay: PropTypes.number,
  /**
   * The number of milliseconds a user must touch the element before showing the tooltip.
   * @default 700
   */
  enterTouchDelay: PropTypes.number,
  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id: PropTypes.string,
  /**
   * Makes a tooltip interactive, i.e. will not close when the user
   * hovers over the tooltip before the `leaveDelay` is expired.
   * @default false
   */
  interactive: PropTypes.bool,
  /**
   * The number of milliseconds to wait before hiding the tooltip.
   * This prop won't impact the leave touch delay (`leaveTouchDelay`).
   * @default 0
   */
  leaveDelay: PropTypes.number,
  /**
   * The number of milliseconds after the user stops touching an element before hiding the tooltip.
   * @default 1500
   */
  leaveTouchDelay: PropTypes.number,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   */
  onClose: PropTypes.func,
  /**
   * Callback fired when the component requests to be open.
   *
   * @param {object} event The event source of the callback.
   */
  onOpen: PropTypes.func,
  /**
   * If `true`, the tooltip is shown.
   */
  open: PropTypes.bool,
  /**
   * Tooltip placement.
   * @default 'bottom'
   */
  placement: PropTypes.oneOf([
    'bottom-end',
    'bottom-start',
    'bottom',
    'left-end',
    'left-start',
    'left',
    'right-end',
    'right-start',
    'right',
    'top-end',
    'top-start',
    'top',
  ]),
  /**
   * The component used for the popper.
   * @default Popper
   */
  PopperComponent: PropTypes.elementType,
  /**
   * Props applied to the [`Popper`](/api/popper/) element.
   */
  PopperProps: PropTypes.object,
  /**
   * Tooltip title. Zero-length titles string are never displayed.
   */
  title: PropTypes /* @typescript-to-proptypes-ignore */.node.isRequired,
  /**
   * The component used for the transition.
   * [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Grow
   */
  TransitionComponent: PropTypes.elementType,
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition) component.
   */
  TransitionProps: PropTypes.object,
};

export default withStyles(styles, { name: 'MuiTooltip', flip: false })(Tooltip);
