import React from 'react';
import PropTypes from 'prop-types';
import { useForkRef } from '../utils/reactHelpers';

/**
 * @ignore - internal component
 * 
 * This is lesser version of the proposed Fragment ref API: <React.Fragment ref />
 * It only works (equivalently?) if children forward the ref until the first host component.
 * It will just attach a ref to the child meaning it should only be wrapped around
 * forwardRef, class or host components
 */
const FragmentRef = React.forwardRef((props, ref) => {
  const { children } = props;
  const handleRef = useForkRef(ref, children.ref);

  return React.cloneElement(children, { ref: handleRef });
});

FragmentRef.propTypes = {
  children: PropTypes.element.isRequired,
};

export default FragmentRef;
