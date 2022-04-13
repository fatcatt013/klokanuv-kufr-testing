import React from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight } from 'react-native';

export default function CompleteTask({ onPress, children }) {
  return <TouchableHighlight onPress={onPress}>{children}</TouchableHighlight>;
}

CompleteTask.defaultProps = {
  children: null,
  onPress: () => {},
};

CompleteTask.propTypes = {
  children: PropTypes.node,
  onPress: PropTypes.func,
};
