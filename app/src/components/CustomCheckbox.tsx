import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const CustomCheckbox = React.memo(function CustomCheckbox(props: any) {
  const iconName = props.checked ? props.checkedIconName : props.uncheckedIconName;

  function onPress() {
    props.onPress(!props.checked);
  }

  return (
    <View style={{ justifyContent: 'flex-end', marginBottom: 1, marginLeft: 5 }}>
      <Icon.Button
        {...props}
        name={iconName}
        size={props.size}
        backgroundColor={props.backgroundColor}
        color={props.color}
        style={{ margin: 0, padding: 0 }}
        iconStyle={[{ margin: 0, padding: 0, alignSelf: 'center', marginRight: 0 }, props.iconStyle]}
        onPress={onPress}
        activeOpacity={props.activeOpacity}
        underlayColor={props.underlayColor}
        borderRadius={props.borderRadius}
      />
    </View>
  );
});

/* 
 * CheckBox.propTypes = {
 *   size: PropTypes.number,
 *   checked: PropTypes.bool,
 *   iconStyle: Text.propTypes.style,
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
  iconStyle: {},
  color: '#006bcc',
  backgroundColor: 'rgba(0,0,0,0)',
  underlayColor: 'rgba(0,0,0,0)',
  activeOpacity: 1,
  borderRadius: 5,
  uncheckedIconName: 'checkbox-blank-circle-outline',
  checkedIconName: 'check-circle',
};
