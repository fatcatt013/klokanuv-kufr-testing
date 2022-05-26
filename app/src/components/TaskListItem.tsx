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
  onPress: () => void;
}> = ({ item, onPress }) => {
  const theme = useTheme();

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
            <Text style={{ fontWeight: 'bold' }}>{item.codename}</Text>
            {item.expected_age_from !== '0.00' && (
              <Text style={{ color: theme.colors.grey }}>
                {Math.round(parseFloat(item.expected_age_from || '0') * 10) / 10}
                {item.expected_age_from !== item.expected_age_to && item.expected_age_to !== '8.00'
                  ? `-${Math.round(parseFloat(item.expected_age_to || '0') * 10) / 10}` : ''}
              </Text>
            )}
          </View>
          <Text>{item.task_description}</Text>
        </View>
        <View style={{ justifyContent: 'center', marginLeft: 4, borderLeftWidth: 1, borderLeftColor: 'rgba(0,0,0,.3)' }}>
          <CustomCheckbox checked={false} onPress={() => { }} />
        </View>
      </Card.Content>
    </Card>
  </View>;
};
