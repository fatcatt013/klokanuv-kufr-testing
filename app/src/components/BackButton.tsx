import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  goBack: () => void;
};

export const BackButton = React.memo(({ goBack }: Props) => {
  const insets = useSafeAreaInsets();

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: insets.top + 10,
      left: insets.left + 10,
    },
    image: {
      width: 24,
      height: 24,
    },
  });

  return (
    <TouchableOpacity onPress={goBack} style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/arrow_back.png')}
      />
    </TouchableOpacity>
  );
});
