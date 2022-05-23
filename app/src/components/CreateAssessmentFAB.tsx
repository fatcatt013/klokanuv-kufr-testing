import React from "react";
import { FAB, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const CreateAssessmentFAB = ({ visible, onPress }: {
  visible?: boolean;
  onPress: () => void;
}) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  return <FAB
    visible={visible}
    icon="order-bool-ascending-variant"
    color="white"
    style={{
      backgroundColor: theme.colors.green,
      position: 'absolute',
      bottom: insets.bottom + 54 + 16,
      right: insets.right + 16,
    }}
    onPress={onPress}
  />
};
