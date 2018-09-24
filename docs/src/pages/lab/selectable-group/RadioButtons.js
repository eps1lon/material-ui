import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import Radio from '@material-ui/core/Radio';
import SelectableGroup from '@material-ui/lab/SelectableGroup';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';

const styles = {
  root: {
    color: green[600],
    '&$checked': {
      color: green[500],
    },
  },
  checked: {},
};

class RadioButtons extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <SelectableGroup component="div" exclusive>
        {({ isValueSelected, toggle }) => {
          const handleChange = (_, value) => toggle(value);
          return (
            <>
              <Radio
                checked={isValueSelected('a')}
                onChange={handleChange}
                value="a"
                name="radio-button-demo"
                aria-label="A"
              />
              <Radio
                checked={isValueSelected('a')}
                onChange={handleChange}
                value="b"
                name="radio-button-demo"
                aria-label="B"
              />
              <Radio
                checked={isValueSelected('a')}
                onChange={this.handleChange}
                value="c"
                name="radio-button-demo"
                aria-label="C"
                classes={{
                  root: classes.root,
                  checked: classes.checked,
                }}
              />
              <Radio
                checked={isValueSelected('a')}
                onChange={handleChange}
                value="d"
                color="default"
                name="radio-button-demo"
                aria-label="D"
              />
              <Radio
                checked={isValueSelected('a')}
                onChange={handleChange}
                value="e"
                color="default"
                name="radio-button-demo"
                aria-label="E"
                icon={<RadioButtonUncheckedIcon fontSize="small" />}
                checkedIcon={<RadioButtonCheckedIcon fontSize="small" />}
              />
            </>
          );
        }}
      </SelectableGroup>
    );
  }
}

RadioButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RadioButtons);
