import React from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight } from 'react-native';

export default function AvailableTasksList({ onPress, children }) {
  return <TouchableHighlight onPress={onPress}>{children}</TouchableHighlight>;
}

AvailableTasksList.defaultProps = {
  children: null,
  onPress: () => {},
};

AvailableTasksList.propTypes = {
  children: PropTypes.node,
  onPress: PropTypes.func,
};
