import React from 'react';

import { Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function CustomCheckbox(props: any) {
  const iconName = props.checked ? props.checkedIconName : props.uncheckedIconName;
  const styles = StyleSheet.create({
    label: {
      fontSize: 16,
    },
  });

  function onPress() {
    props.onPress(!props.checked);
  }

  return (
    <View style={{ justifyContent: 'center', marginBottom: 1, marginLeft: 5 }}>
      <Icon.Button
        {...props}
        name={iconName}
        size={props.size}
        backgroundColor={props.backgroundColor}
        color={props.color}
        style={{ margin: 0, padding: 0 }}
        iconStyle={[{ margin: 0, padding: 0, alignSelf: 'center' }, props.iconStyle, props.checked && props.checkedIconStyle]}
        onPress={onPress}
        activeOpacity={props.activeOpacity}
        underlayColor={props.underlayColor}
        borderRadius={props.borderRadius}
      >
        <Text
          style={[styles.label, props.labelStyle]}
        >
          {props.label}
        </Text>
      </Icon.Button>
    </View>
  );
}
/* 
 * CheckBox.propTypes = {
 *   size: PropTypes.number,
 *   checked: PropTypes.bool,
 *   label: PropTypes.string,
 *   labelStyle: Text.propTypes.style,
 *   iconStyle: Text.propTypes.style,
 *   checkedIconStyle: Text.propTypes.style,
 *   color: PropTypes.string,
 *   backgroundColor: PropTypes.string,
 *   onPress: PropTypes.func,
 *   underlayColor: PropTypes.string,
 *   activeOpacity: PropTypes.number,
 *   borderRadius: PropTypes.number,
 *   uncheckedIconName: PropTypes.string,
 *   checkedIconName: PropTypes.string,
 * }; */

CustomCheckbox.defaultProps = {
  size: 18,
  checked: false,
  labelStyle: {},
  iconStyle: {},
  checkedIconStyle: {},
  color: '#006bcc',
  backgroundColor: 'rgba(0,0,0,0)',
  underlayColor: 'rgba(0,0,0,0)',
  activeOpacity: 1,
  borderRadius: 5,
  uncheckedIconName: 'checkbox-blank-circle-outline',
  checkedIconName: 'check-circle',
};
