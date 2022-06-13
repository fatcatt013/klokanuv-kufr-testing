import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { theme } from '../../theme';
import { ClassIDContext } from '../../lib/contexts';
import { Card, Portal, Text } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../lib/navigation';
import { CustomCheckbox } from '../CustomCheckbox';
import { MultiFAB } from '../MultiFAB';
import { useRecoilValue } from 'recoil';
import { classChildrenState } from '../../store';

type Props = StackScreenProps<RootStackParamList, 'Class'>;

export function ChildList({ navigation }: Props) {
  const classId = React.useContext(ClassIDContext);
  const children = useRecoilValue(classChildrenState(classId));

  const isFocused = useIsFocused();
  const [mode, setMode] = React.useState<'view' | 'select'>('view');
  const [selected, setSelected] = React.useState<number[]>([]);

  React.useEffect(() => {
    setSelected([]);
    setMode('view');
  }, [useIsFocused, setSelected, setMode]);

  const onPressCheck = React.useCallback((childId: number) => {
    if (selected.includes(childId)) {
      if (selected.length === 1) {
        setSelected([]);
        setMode('view');
      } else {
        setSelected(selected.filter(x => x !== childId));
      }
    } else {
      setMode('select');
      setSelected([...selected, childId]);
    }
  }, [selected, setSelected, setMode]);

  const onPress = React.useCallback((childId: number) => {
    if (mode === 'view') {
      navigation.push('Child', { childId });
    } else {
      onPressCheck(childId);
    }
  }, [mode, selected]);

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
          onPress={() => onPress(item.id!)}
        >
          <View style={{ flexDirection: 'row', alignItems: 'stretch', justifyContent: 'space-between' }}>
            <Text style={{ padding: 2, fontWeight: 'bold', color: 'white' }}>{item.shortName}</Text>
            <View>
              <CustomCheckbox
                iconStyle={{ color: 'white' }}
                checked={selected.includes(item.id!)}
                onPress={() => onPressCheck(item.id!)}
              />
            </View>
          </View>
        </Card>
      )}
    />

    <Portal>
      <MultiFAB visible={isFocused} tabs multi={mode === 'select'} initial={{ classId, childIds: selected }} />
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
