import React from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight } from 'react-native';

export default function CompletedTasksList({ onPress, children }) {
  return <TouchableHighlight onPress={onPress}>{children}</TouchableHighlight>;
}

CompletedTasksList.defaultProps = {
  children: null,
  onPress: () => {},
};

CompletedTasksList.propTypes = {
  children: PropTypes.node,
  onPress: PropTypes.func,
};
