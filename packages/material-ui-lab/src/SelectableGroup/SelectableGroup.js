import * as React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles';
import * as utils from './utils';

export const styles = {
  /* Styles applied to the root element. */
  root: {},
  /* Styles applied to the root element if `selected={true}` or `selected="auto" and `value` set. */
  selected: {},
};

/**
 * @internal
 */
class SelectableGroup extends React.Component {
  state = {
    selected: [],
  };

  deselect = this.createReducer(utils.deselect);

  select = this.createReducer(utils.select);

  toggle = this.createReducer(utils.toggle);

  isValueSelected = value => {
    return utils.hasValue(this.state.values, value);
  };

  isSelected() {
    return this.state.selected.length > 0;
  }

  createReducer(handler) {
    return value => {
      this.setState(({ selected: prevSelected }, props) => {
        const selected = handler(prevSelected, value, props);

        if (selected.length === prevSelected.length) {
          return null;
        }

        this.onChange(selected, value);

        return { selected };
      });
    };
  }

  render() {
    const { deselect, isValueSelected, select, toggle } = this;
    const {
      children,
      classes,
      component: Component,
      exclusive,
      isSelected,
      onChange,
      value,
      ...other
    } = this.props;

    return (
      <Component {...other}>{children({ deselect, isValueSelected, select, toggle })}</Component>
    );
  }
}

SelectableGroup.propTypes = {
  /**
   * The content of the button.
   */
  children: PropTypes.func.isRequired,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
  /**
   * If `true`, only allow one of the child ToggleButton values to be selected.
   */
  exclusive: PropTypes.bool,
  /**
   * If `true`, render the group in a selected state. If `auto` (the default)
   * render in a selected state if `value` is not empty.
   */
  isSelected: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['auto'])]),
  /**
   * Callback fired when the value changes.
   *
   * @param {object} event The event source of the callback
   * @param {object} value of the selected buttons. When `exclusive` is true
   * this is a single value; when false an array of selected values. If no value
   * is selected the value is null.
   */
  onChange: PropTypes.func,
  /**
   * The currently selected value within the group or an array of selected
   * values when `exclusive` is false.
   */
  value: PropTypes.any,
};

SelectableGroup.defaultProps = {
  exclusive: false,
  isSelected: 'auto',
  value: null,
};

export default withStyles(styles, { name: 'MuiSelectableGroup' })(SelectableGroup);
