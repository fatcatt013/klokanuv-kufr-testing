import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Background } from '../Background';
import { CategoryPicker } from '../CategoryPicker';
import { RootStackParamList } from '../../lib/navigation';
import { ClassIDContext } from '../../lib/contexts';
import { useIsFocused } from '@react-navigation/native';
import { useMultiFABScroll } from '../MultiFABContext';

type Props = StackScreenProps<RootStackParamList, 'Class'>;

export const ClassCategorySelect = ({ navigation }: Props) => {
  const classId = React.useContext(ClassIDContext);
  const isFocused = useIsFocused();
  const { setStatus } = useMultiFABScroll()

  React.useEffect(() => {
    if (isFocused) {
      setStatus({ initial: { classId } })
    }
  }, [isFocused, setStatus, classId]);

  return <Background>
    <CategoryPicker onSelect={(categoryId) => navigation.navigate('ClassCategory', { classId, categoryId })} />
  </Background>;
};
