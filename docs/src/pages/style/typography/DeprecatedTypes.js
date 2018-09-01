import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    width: '100%',
    maxWidth: 500,
  },
};

function Types(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Typography variant="display4" gutterBottom suppressDeprecationWarnings>
        Display 4
      </Typography>
      <Typography variant="display3" gutterBottom suppressDeprecationWarnings>
        Display 3
      </Typography>
      <Typography variant="display2" gutterBottom suppressDeprecationWarnings>
        Display 2
      </Typography>
      <Typography variant="display1" gutterBottom suppressDeprecationWarnings>
        Display 1
      </Typography>
      <Typography variant="headline" gutterBottom suppressDeprecationWarnings>
        Headline
      </Typography>
      <Typography variant="title" gutterBottom suppressDeprecationWarnings>
        Title
      </Typography>
      <Typography variant="subheading" gutterBottom suppressDeprecationWarnings>
        Subheading
      </Typography>
      <Typography variant="body2" gutterBottom suppressDeprecationWarnings>
        Body 2
      </Typography>
      <Typography variant="body1" gutterBottom align="right" suppressDeprecationWarnings>
        Body 1
      </Typography>
      <Typography variant="caption" gutterBottom align="center" suppressDeprecationWarnings>
        Caption
      </Typography>
      <Typography gutterBottom noWrap suppressDeprecationWarnings>
        {`
          Lorem ipsum dolor sit amet, consectetur adipisicing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        `}
      </Typography>
      <Typography variant="button" gutterBottom suppressDeprecationWarnings>
        Button
      </Typography>
    </div>
  );
}

Types.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Types);
