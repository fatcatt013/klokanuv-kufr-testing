import React from 'react';
import { Animated, View, Pressable, StyleSheet } from 'react-native';
import { ParamListBase, useTheme } from '@react-navigation/native';
import { StackScreenProps, useCardAnimation } from '@react-navigation/stack';

type Props = StackScreenProps<ParamListBase>;

export function Modal({ navigation, children }: Props & { children: React.ReactNode }) {
  const { colors } = useTheme();
  const { current } = useCardAnimation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Pressable
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
        ]}
        onPress={navigation.goBack}
      />
      <Animated.View
        style={{
          padding: 16,
          width: '90%',
          maxWidth: 400,
          borderRadius: 3,
          backgroundColor: colors.card,
          transform: [
            {
              scale: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0.9, 1],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}
      >
        {children}
      </Animated.View>
    </View>
  );
}
