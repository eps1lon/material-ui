/* eslint-disable import/prefer-default-export */

import React from 'react';
import classNames from 'classnames';

export function cloneElementWithClassName(child, className, props) {
  return React.cloneElement(child, {
    ...props,
    className: classNames(child.props.className, className),
  });
}

export function cloneChildrenWithClassName(children, className) {
  return React.Children.map(children, child => {
    return React.isValidElement(child) && cloneElementWithClassName(child, className);
  });
}

export function isMuiElement(element, muiNames) {
  return React.isValidElement(element) && muiNames.indexOf(element.type.muiName) !== -1;
}

export function setRef(ref, value) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}
