import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import NoSsr from '@material-ui/core/NoSsr';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';
import Container from '@material-ui/core/Container';

const styles = theme => ({
  root: {
    minHeight: 600,
  },
  markdownElement: {
    padding: theme.spacing(4, 0),
  },
});

// TODO: port to mdx
function HomeBackers(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <NoSsr>
        <Container maxWidth="md" />
      </NoSsr>
    </div>
  );
}

HomeBackers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeBackers);
