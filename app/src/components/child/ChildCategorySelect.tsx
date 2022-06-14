import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { useIsFocused } from '@react-navigation/native';
import { Background } from '../Background';
import { CategoryPicker } from '../CategoryPicker';
import { RootStackParamList } from '../../lib/navigation';
import { ChildIDContext } from '../../lib/contexts';
import { useMultiFABScroll } from '../MultiFABContext';

type Props = StackScreenProps<RootStackParamList, 'Child'>;

export const ChildCategorySelect = ({ navigation }: Props) => {
  const childId = React.useContext(ChildIDContext);
  const isFocused = useIsFocused();
  const { setStatus } = useMultiFABScroll()

  React.useEffect(() => {
    if (isFocused) {
      setStatus({ initial: { childIds: [childId] } })
    }
  }, [isFocused, setStatus, childId]);

  return <Background>
    <CategoryPicker onSelect={categoryId => navigation.navigate('ChildCategory', { childId, categoryId })} />
  </Background>;
};
