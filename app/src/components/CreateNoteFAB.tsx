import React from "react";
import { FAB, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const CreateNoteFAB = ({ visible, onPress }: {
  visible?: boolean;
  onPress: () => void;
}) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  return <FAB
    visible={visible}
    icon="note-plus-outline"
    color="white"
    style={{
      backgroundColor: theme.colors.blue,
      position: 'absolute',
      bottom: insets.bottom + 54 + 16,
      right: insets.right + 16
    }}
    onPress={onPress}
  />
};
