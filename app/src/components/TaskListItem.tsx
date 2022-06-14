import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Card, Text, useTheme } from 'react-native-paper';
import { Components } from '../server';
import { CustomCheckbox } from './CustomCheckbox';
import { colors } from '../theme';
import { useRecoilValue } from 'recoil';
import { assessmentTypeState } from '../store';
import format from 'date-fns/format';

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
  assessments?: Components.Schemas.Assessment[];
  checked?: boolean;
  onPress: () => void;
  onCheck: () => void;
}> = React.memo(function TaskListItem({ item, assessments, checked, onPress, onCheck }) {
  const theme = useTheme();
  const [id, ...rest] = (item.codename || '').split(' ');
  const assessmentType = useRecoilValue(assessmentTypeState(item.assessment_type));

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
      <Card.Content style={{ flexDirection: 'row', padding: 10 }}>
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
        <View style={{ marginLeft: 4, alignItems: 'flex-end' }}>
          <CustomCheckbox checked={checked} onPress={onCheck} />
        </View>
      </Card.Content>
      {assessmentType && assessments && (
        <Card.Content style={{
          flexDirection: 'row',
          borderTopWidth: 2,
          borderColor: 'rgba(0, 0, 0, 0.2)',
          padding: 0
        }}>
          {assessmentType.options!.map((option, i) => {
            const records = assessments.filter(x => x.option === option.id);
            return <View key={option.id} style={{
              borderLeftWidth: i === 0 ? undefined : 2,
              borderColor: 'rgba(0, 0, 0, 0.2)',
              flexBasis: '33%',
              padding: 5,
              minHeight: 50
            }}>
              <Text style={{ fontSize: 10, color: 'rgba(0,0,0,0,6)' }}>{option.label}</Text>
              {records.map(assessment => (
                <Text key={assessment.id!}>{format(new Date(assessment.date_of_assessment), 'MM/yy')}</Text>
              ))}
            </View>;
          })}
        </Card.Content>
      )}
    </Card>
  </View>;
});
