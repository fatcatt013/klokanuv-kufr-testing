import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Card, Text, useTheme } from 'react-native-paper';
import { Components } from '../server';
import { CustomCheckbox } from './CustomCheckbox';
import { colors } from '../theme';

const icons = {
  '+': 'plus-box',
  '=': 'equal-box',
  '-': 'minus-box',
};
const iconColors = {
  '+': colors.red,
  '=': colors.yellow,
  '-': colors.green,
};

export const TaskListItem: React.FC<{
  item: Components.Schemas.Task;
  checked?: boolean;
  onPress: () => void;
  onCheck: () => void;
}> = React.memo(function TaskListItem({ item, checked, onPress, onCheck }) {
  const theme = useTheme();
  const [id, ...rest] = (item.codename || '').split(' ');

  return <View style={{ flexDirection: 'row' }}>
    {item.parent_task && <View style={{ width: 35, marginLeft: 3, justifyContent: 'center' }}>
      {item.difficulty && (
        <Icon
          size={25}
          style={{ color: iconColors[item.difficulty], marginHorizontal: 'auto' }}
          name={icons[item.difficulty]}
        />
      )}
    </View>}
    <Card style={{ flex: 1, margin: 3 }} onPress={onPress}>
      <Card.Content style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontWeight: 'bold' }}>
              {id ? `${id}. ` : ''}{rest.join(' ')}
            </Text>
            {item.expected_age_from !== '0.00' && (
              <Text style={{ color: theme.colors.grey }}>
                Věk: {Math.round(parseFloat(item.expected_age_from || '0') * 100) / 100}
                {item.expected_age_from !== item.expected_age_to && item.expected_age_to !== '8.00'
                  ? `-${Math.round(parseFloat(item.expected_age_to || '0') * 100) / 100}` : ''}
              </Text>
            )}
          </View>
          <Text>{item.task_description}</Text>
        </View>
        <View style={{ marginLeft: 4 }}>
          <CustomCheckbox checked={checked} onPress={onCheck} />
        </View>
      </Card.Content>
    </Card>
  </View>;
});
