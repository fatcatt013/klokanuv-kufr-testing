import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { theme } from '../theme';
import { ClassIDContext } from '../lib/contexts';
import { useClassroom } from '../use-school-data';
import { Card, Portal, Text } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../lib/navigation';
import { CustomCheckbox } from './CustomCheckbox';
import { CreateAssessmentFAB } from './CreateAssessmentFAB';

type Props = StackScreenProps<RootStackParamList, 'Class'>;

export function ChildList({ navigation }: Props) {
  const classId = React.useContext(ClassIDContext);
  const classroom = useClassroom(classId);
  const isFocused = useIsFocused();
  let children = classroom?.children || [];
  const [mode, setMode] = React.useState<'view' | 'select'>('view');
  const [selected, setSelected] = React.useState<number[]>([]);

  children = children.sort((x, y) => 0.5 - x.first_name.localeCompare(y.first_name));

  React.useEffect(() => {
    setSelected([]);
    setMode('view');
  }, [classId, setSelected, setMode]);

  return <>
    <FlatList
      data={children}
      keyExtractor={item => item.id!.toString()}
      numColumns={2}
      renderItem={({ item }) => (
        <Card
          style={[styles.item, {
            padding: 8,
            backgroundColor:
              !item.gender ? undefined :
                item.gender === "M" ? theme.colors.blue : theme.colors.red
          }]}
          onPress={() => {
            if (mode === 'view') {
              navigation.push('Child', { childId: item.id! })
            } else {
              if (selected.includes(item.id!)) {
                if (selected.length === 1) {
                  setSelected([]);
                  setMode('view');
                } else {
                  setSelected(selected.filter(x => x !== item.id!));
                }
              } else {
                setSelected([...selected, item.id!]);
              }
            }
          }}
          onLongPress={() => {
            setMode('select')
            setSelected([item.id!!])
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{
              padding: 2, fontWeight: 'bold', color: 'white'
            }}>{item.first_name} {item.last_name.slice(0, 1)}.</Text>
            <View style={{ borderLeftWidth: 1, borderLeftColor: 'rgba(255,255,255,.3)', }}>
              <CustomCheckbox
                iconStyle={{ color: 'white' }}
                checked={selected.includes(item.id!)}
                onPress={() => { setMode('select'); setSelected(xs => [...xs, item.id!]) }}
              />
            </View>
          </View>
        </Card>
      )}
    />

    <Portal>
      <CreateAssessmentFAB
        visible={isFocused && mode === 'select'}
        onPress={() => navigation.push('CreateAssessment', { children: selected, tasks: [] })}
      />
    </Portal>
  </>
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    backgroundColor: theme.colors.green,
    marginHorizontal: 4,
    marginVertical: 4,
  },
});

// maxWidth: children.length % 2 === 1 && children.length - 1 === index ? '49.25%' : '100%'
