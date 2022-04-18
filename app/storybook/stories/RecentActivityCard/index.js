import React from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight } from 'react-native';

export default function RecentActivityCard({ onPress, children }) {
  return <TouchableHighlight onPress={onPress}>{children}</TouchableHighlight>;
}

RecentActivityCard.defaultProps = {
  children: null,
  onPress: () => {},
};

RecentActivityCard.propTypes = {
  children: PropTypes.node,
  onPress: PropTypes.func,
};
